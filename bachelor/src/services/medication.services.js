import axios from "axios";

const medicineApi = "https://api.fda.gov";
const recogniseUrl = "https://medcarepython.herokuapp.com/recognise/";
const wikiPedia =
  "https://cors-anywhere.herokuapp.com/https://nl.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=";

export const recognisePicture = async (picture) => {
  let data;

  await axios
    .post(recogniseUrl, {
      method: "POST",
      cache: "no-cache",
      data: picture,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      console.log(res.data);

      data = res.data;
    });

  return data;
};

export const sendTextMessage = async (reminderId, phoneNumber, dateTime) => {
  const year = dateTime.getFullYear();
  const month = (dateTime.getMonth() + 1).toString().padStart(2, 0); // (0-11)
  const date = dateTime.getDate().toString().padStart(2, 0);
  const hour = dateTime.getHours().toString().padStart(2, 0);
  const minute = dateTime.getMinutes().toString().padStart(2, 0);
  const second = dateTime.getSeconds().toString().padStart(2, 0);
  const formattedDate = `${year}-${month}-${date} ${hour}:${minute}:${second}`
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  await axios.post(
    'https://cors-anywhere.herokuapp.com/https://rest.textmagic.com/api/v2/messages',
    {
      text: `Reminder:\n vergeet niet uw medicijn te nemen!\n Meer informatie: ${process.env.REACT_APP_URL}reminder/${reminderId}\n ***negeer dit bericht wanneer je dit al gedaan hebt***`,
      phones: phoneNumber,
      sendingDateTime: formattedDate,
      sendingTimezone: timeZone
    },
    {
      headers: {
        Accept: 'application/json',
      },
      auth: {
        username: process.env.REACT_APP_SMS_USERNAME,
        password: process.env.REACT_APP_SMS_API,
      },
    }
  )
    .then((res) => {
      console.log(res);
    })
    .catch((ex) => {
      console.error(ex);
    });

};
