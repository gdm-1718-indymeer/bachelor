import axios from "axios"

const medicineApi = 'https://api.fda.gov';
const recogniseUrl = 'http://localhost:5000/recognise/';
const wikiPedia = 'https://cors-anywhere.herokuapp.com/https://nl.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro='

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