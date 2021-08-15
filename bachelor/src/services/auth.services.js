import firebase from '../config/firebaseConfig';
import emailJs from 'emailjs-com'

export const auth = firebase.auth();
export const db = firebase.database();
export const googleProvider = new firebase.auth.GoogleAuthProvider();

emailJs.init(process.env.REACT_APP_EMAIL_USER_ID)
const serviceId = process.env.REACT_APP_EMAIL_SERVICE_ID;

// SIGN IN
export const signInWithEmailAndPassword = async (email, password) => {
  try {
    const result = await auth.signInWithEmailAndPassword(email, password);
    return true;
  } catch (error) {
    return error;
  }
};

// SIGN UP
export const createUserWithEmailAndPassword = async (email, password, firstname, lastname) => {
  try {
    const createUser = await auth.createUserWithEmailAndPassword(
      email,
      password
    );
    createUser.user.updateProfile({
      displayName: firstname,
    });

    await db.ref('user').child(createUser.user.uid).set({
      firstname,
      lastname,
      email,
      tel: '',
    });

    let result = createUser;
    return true;
  } catch (error) {
    return error;
  }
};

// SIGN UP Google

export const signInWithGoogle = (url) => {
  auth
    .signInWithPopup(googleProvider)
    .then((res) => {
      let user = res.user;
      db.ref('user').child(res.user.uid).update({
        displayName: user.displayName,
        email: user.email,
        tel: user.phoneNumber,
        profilePicture: user.photoURL,
      });
      window.location = url;
    })
    .catch((error) => {
      console.log(error.message);
    });
};

// RESET PASSWORD

export const forgotPassword = (Email) => {
  firebase.auth().sendPasswordResetEmail(Email)
  return
}

// CREATE CUSTOM UID

export const uuidv4 = () => {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
};

// PUSH SCHEDULE

export const setSchedule = async (uid, data) => {
  await db.ref().child(`event/${uid}/`).update(data);
  return true;
};


// DELETE SCHEDULE

export const deleteSchedule = async (uid, id) => {
  await db.ref().child(`event/${uid}/${id}`).remove();
  return true;
};

// GET CURRENT DATA

export const getCurrentData = async (uid, id) => {
  let data;
  await db
    .ref()
    .child(`event/${uid}/${id}`)
    .once('value')
    .then((snapshot) => {
      data = snapshot.val();
    });
  return data;
};

//SET CURRENT DATA
export const setCurrentData = async (uid, id, data) => {
  await db.ref().child(`event/${uid}/${id}`).set(data);
}

// GET ALL DATA

export const getAllData = async (uid) => {
  if (await canGetUserData(uid)) {
    let data;
    await db.ref().child(`event/${uid}/`).once('value').then((snapshot) => {
      data = snapshot.val();
    });
    return data;
  }
};

// GET SCHEDULE FROM DATE

export const getScheduleByDate = async (uid, date) => {
  let data;
  await db
    .ref()
    .child(`event/${uid}/`)
    .orderByChild('targetDate')
    .equalTo(date)
    .once('value')
    .then((snapshot) => {
      data = snapshot.val();
    });
  return data;
};

// GET DATA BEFORE DATE

export const getPreviousData = async (uid, time) => {
  let data;
  await db
    .ref(`event/${uid}/`)
    .orderByChild('timeStamp')
    .endAt(time)
    .limitToLast(1)
    .once('value')
    .then((snapshot) => {
      snapshot.forEach((childSnapshot) => {
        data = childSnapshot.val();
      });
    });
  return data;
};

// GET DATA CLOSE TO DATE

export const getNextData = async (uid, time) => {
  let data;
  let key;
  await db
    .ref(`event/${uid}/`)
    .orderByChild('timeStamp')
    .startAt(time)
    .once('value')
    .then((snapshot) => {
      snapshot
        .forEach((childSnapshot) => {
          if (!childSnapshot.val().isTaken && !key && !data) {
            key = childSnapshot.key;
            data = childSnapshot.val();
          }
        });
    });
  return [data, key].filter((i) => { return i; });
};

// GET USER

export const getCurrentUser = async () => {
  const currentUser = await JSON.parse(
    localStorage.getItem('firebase:currentUser')
  );
  if (currentUser) {
    return await currentUser;
  }
};
export const isAdmin = async () => {
  let currentUser = JSON.parse(localStorage.getItem('firebase:currentUser'))
  let data = (await db.ref().child('access').orderByChild("adminId").equalTo(currentUser.uid).once('value')).val();
  if (Object.keys(data).length > 0) return true;
  return false;
}
export const canGetUserData = async (uid) => {
  let currentUser = JSON.parse(localStorage.getItem('firebase:currentUser'))
  if (uid === currentUser.uid) {
    return true;
  }
  let data = (await db.ref().child('access').orderByChild("adminId").equalTo(currentUser.uid).once('value')).val();
  for (const i of Object.keys(data)) {
    if (data[i].clientId === uid) {
      return true;
    }
  }
  return false;
}
// GET USER DATA

export const getUserData = async (uid) => {
  if (await canGetUserData(uid)) {

    let data;
    await db.ref().child('user').child(uid).once('value').then((userSnap) => {
      data = userSnap.val();
    });
    return data;
  }
};

// PUSH MEDICINES DATA

export const addMedication = async (data) => {
  try {
    await db.ref().child(`medicine/${data.name}`).update(data);
    return true;
  } catch (error) {
    return error;
  }
};

// GET MEDICINES DATA

export const getAllMedicineData = async () => {
  let data;
  await db.ref().child('medicine').once('value').then((userSnap) => {
    data = userSnap.val();
  });
  return data;
};

// GET MEDICINES DATA

export const getMedicineDetails = async (name) => {
  let data;
  await db.ref().child(`medicine/${name}`).once('value').then((userSnap) => {
    data = userSnap.val();
  });
  return data;
};

// DELETE MEDICINES DATA

export const deleteMedication = async (id) => {
  try {
    console.log(id)
    await db.ref().child(`medicine/${id}`).remove();
    return true;
  } catch (error) {
    return error;
  }
};

// UPDATE PERSONAL  INFORMATION

export const updatePersonalInformation = async (uid, displayName, email, phone, photo) => {
  await db.ref(`user/${uid}`).update({
    displayName: displayName,
    email: email,
    phoneNumber: phone,
    profilePicture: photo

  });

  const currentUser = auth.currentUser;
  await currentUser.updateProfile({
    displayName: displayName,
    profilePicture: photo
  });

  return true;
};

export const uploadProfilePicture = async (file) => {
  let pictureUrl;

  // Get current username
  var user = firebase.auth().currentUser;

  // Create a Storage Ref w/ username
  var storageRef = firebase.storage().ref(user.uid + '/profilePicture/' + file.name);

  // Upload file
  await storageRef.put(file)

  await storageRef.getDownloadURL().then(url => {
    pictureUrl = url;
  });

  return pictureUrl;
};

//PUSH INVITATION DATA

export const pushInvitationData = async (invitationId, data) => {
  getCurrentUser().then((user) => {
    db.ref().child(`invitations`).child(invitationId).set({ ...data, adminId: user.uid })
  });
}

//GET INVITATION DATA

export const getInvitationsById = async (userId, invitationID) => {
  let data =
    await db.ref().child(`invitations`).child(invitationID).once('value')
  return data.val()
}

//DELETE INVITATION DATA

export const deleteInvitationById = async (invitationId) => {
  await db.ref().child('invitations').child(invitationId).remove();
}

//ADD ADMIN ROLE

export const setAdminProfile = async (id) => {
  await db.ref().child('user').child(id).update({ isAdmin: true });
}


//PUSH ACCESS

export const pushAccess = async ({ adminId, clientId }) => {
  await db.ref().child('access').push({ adminId, clientId })
}

//SEND INVITE

export const sendInvite = (email, inviteId) => {
  const templateId = process.env.REACT_APP_EMAIL_INVITE_TEMPLATE_ID;
  getCurrentUser().then((user) => {
    const username = user.displayName || user.firstname + " " + user.lastname;
    emailJs.send(serviceId, templateId, { adminName: username, inviteId, to: email }, process.env.REACT_APP_EMAIL_USER_ID)

  })
}

// CHECK IF MEDBOX KEY EXIST

export const checkIfExist = async (key) => {
  try {
    let c
    let user = firebase.auth().currentUser;

    await db.ref().child('pillbox').once('value').then((snapshot) => {
      c = snapshot.child(key).exists(); // true
    });

    if (c) {
      await db.ref().child(`pillbox/${key}`).child(user.uid).set({
        welcome: true
      })
      await db.ref('user').child(user.uid).update({
        havePillbox: true,
        pillBoxId: key
      })
    }
    return c
  } catch (error) {
    return error;
  }
};


// ADD CHECK FOR FILLING PILLBOX

export const fillMedbox = async (key, uid) => {
  try {

    await db.ref().child(`pillbox/${key}/${uid}`).update({
      fill: true
    });

    return true
  } catch (error) {
    return error;
  }
};

// ADD DATA TO PILLBOX

export const addDataMedBox = async (key, uid, events) => {
  try {

    await db.ref().child(`pillbox/${key}/${uid}`).update({ events });

    return true
  } catch (error) {
    return error;
  }
};


// GET USER WHERE YOU ACCES HAVE TO 

export const myUsersAcces = async (id) => {
  let keys = []
  let data = [];
  await db.ref().child("access").orderByChild("adminId").equalTo(id).once("value", snapshot => {
    if (snapshot.exists()) {
      snapshot.forEach(childSnapshot => {
        let key = childSnapshot.val()
        keys.push(key.clientId)
      })
    }
  });
  // check for duplicates in keys
  let unique = keys.sort().filter(function (item, pos, ary) { return !pos || item !== ary[pos - 1]; });
  for (const val of unique) {
    let user = await getUserData(val)
    Object.assign(user, { id: val })
    data.push(user)
  }
  return data
}

// SIGN OUT

export const signOut = async () => {
  localStorage.removeItem('firebase:currentUser');
  return await auth.signOut();
};

// LOGOUT
export const logoutUser = async () => {
  await auth.signOut();
};
