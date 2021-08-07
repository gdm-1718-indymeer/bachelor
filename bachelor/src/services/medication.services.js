import axios from "axios"

const medicineApi = 'https://api.fda.gov';
const recogniseUrl = 'http://localhost:5000/recognise/';
const wikiPedia = 'https://cors-anywhere.herokuapp.com/https://nl.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro='

export const getMedicines = async () => {
  let data
  await axios.get('https://api.fda.gov/drug/label.json?count=openfda.brand_name.exact&limit=1000')
    .then(res => {
      data = res.data.results
    })

  return data
}


export const getMedicineDetails = async (name) => {
  let data
  console.log(name)
  //await axios.get(medicineApi + `/drug/label.json?search=${name}`)
  await axios.get(wikiPedia + `&titles=${name}`, {
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    }
  })
    .then(res => {
      let response = res.data.query.pages;
      Object.values(response).map(value => {
        data = [value.extract];
        console.log(data)
      })
    })

  return data
}

export const recognisePicture = async (picture) => {
  let data

  await axios.post(recogniseUrl, {
    method: "POST",
    cache: "no-cache",
    data: picture,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
  })
    .then(res => {
      console.log(res.data)

      data = res.data.results[0];
    })

  return data
}

export const sendTextMessage = async (username, password) => {
  await axios.post(
    'https://cors-anywhere.herokuapp.com/https://rest.textmagic.com/api/v2/messages',
    {
      text: 'whatsup',
      phones: '32474263841',
    },
    {
      headers: {
        Accept: 'application/json',
      },
      auth: {
        username,
        password,
      },
    }
  )
    .then((res) => {
      console.log(res);
    })
    .catch((ex) => {
      console.log(ex);
    });
}