import firebase from '../config/firebaseConfig';

export const auth = firebase.auth();
export const db = firebase.database();
export const googleProvider = new firebase.auth.GoogleAuthProvider();

// SIGN IN
export const signInWithEmailAndPassword = async (email, password) => {
  try {
    const result = await auth.signInWithEmailAndPassword(email, password);
    const userId = result.user.uid;
    await getType(userId);
    return true;
  } catch (error) {
    return error;
  }
};

// SIGN UP
export const createUserWithEmailAndPassword = async (
  email,
  password,
  firstname,
  lastname
) => {
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
    await getType(createUser.user.uid);
    return true;
  } catch (error) {
    return error;
  }
};

// SIGN UP Google

export const signInWithGoogle = () => {
  auth
    .signInWithPopup(googleProvider)
    .then((res) => {
      let user = res.user;
      db.ref('user').child(res.user.uid).set({
        displayName: user.displayName,
        email: user.email,
        tel: user.phoneNumber,
        profilePicture: user.photoURL,
      });
      window.location = '/settings';
    })
    .catch((error) => {
      console.log(error.message);
    });
};

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

// GET ALL DATA

export const getAllData = async (uid) => {
  let data;
  await db.ref().child(`event/${uid}/`).once('value').then((snapshot) => {
    data = snapshot.val();
  });
  return data;
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
    .limitToFirst(1)
    .once('value')
    .then((snapshot) => {
      snapshot.forEach((childSnapshot) => {
        key = childSnapshot.key;
        data = childSnapshot.val();
      });
    });
  return [data, key].filter((i) => i);
};

// GET TYPE
export const getType = async (userId) => {
  await db.ref(`user/${userId}`).once('value', (snapshot) => {
    localStorage.setItem('firebase:currentUserType', snapshot.val().type);
    return snapshot.val().type;
  });
};

// SIGN OUT

export const signOut = async () => {
  localStorage.removeItem('firebase:currentUser');
  return await auth.signOut();
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

// GET USER DATA

export const getUserData = async (uid) => {
  let data;
  await db.ref().child('user').child(uid).once('value').then((userSnap) => {
    data = userSnap.val();
  });
  return data;
};

// GET MEDICINES DATA

export const getAllMedicineData = async () => {
  let data;
  await db
    .ref()
    .child('medicine')
    .once('value')
    .then((userSnap) => {
      data = userSnap.val();
    });
  return data;
};

// GET USER (AGENCY/ARTIST) INFORMATION BY UID
export const getTypeInformation = async (type, uid) => {
  let data, key;
  await db
    .ref()
    .child(type)
    .orderByChild('uid')
    .equalTo(uid)
    .once('value')
    .then((userSnap) => {
      userSnap.forEach((childSnap) => {
        key = childSnap.key;
        data = JSON.stringify(childSnap.val());
      });
    });
  return [data, key];
};

// GET USER (AGENCY/ARTIST) INFORMATION BY TYPE KEY
export const getTypeInformationByKey = async (type, key) => {
  let data;
  await db
    .ref()
    .child(type)
    .child(key)
    .once('value')
    .then((userSnap) => {
      data = userSnap.val();
    });
  return data;
};

// LOGOUT
export const logoutUser = async () => {
  await auth.signOut();
};

// UPDATE PERSONAL AND PROFESSIONEL INFORMATION
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
