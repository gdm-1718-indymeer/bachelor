import React, { useState, useEffect } from "react";
import Select from "react-select";
import moment from "moment";
import TimePicker from "rc-time-picker";
import {
  setSchedule,
  uuidv4,
  getAllMedicineData,
  getUserData,
  getCurrentUser,
} from "../services/auth.services";
import AOS from "aos";
import "aos/dist/aos.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBreadSlice,
  faCoffee,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";

import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker from "@hassanmojab/react-modern-calendar-datepicker";

import "rc-time-picker/assets/index.css";
import { sendTextMessage } from "../services/medication.services";
const textmagicClient = require("textmagic-client");
let currentUser = JSON.parse(localStorage.getItem("firebase:currentUser"));

const client = textmagicClient.ApiClient.instance;
const auth = client.authentications["BasicAuth"];
const api = new textmagicClient.TextMagicApi();

auth.username = process.env.REACT_APP_SMS_USERNAME;
auth.password = "ZAH7BlldVKUcm5Dv6kyGKPCfEqCD9C"; //process.env.REACT_APP_SMS_API;

const showSecond = false;

const pillNames = [
  { value: "Paracetamol", label: "Paracetamol" },
  { value: "Ibuprofen", label: "Ibuprofen" },
];

const options = [];
for (let i = 1; i < 100; i += 1) {
  const option = {
    value: `${i - 1}`,
    label: `${i}`,
  };
  options.push(option);
}

// create timestamp and create date
let toDate = (year, month, day, hour, minute) => {
  return new Date(year, month - 1, day, hour, minute);
};

const toTimestamp = (date) => {
  return Math.floor(date.getTime() / 1000);
};

const AddMedicine = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [message, setMessage] = useState(false);
  const [medicines, setMedicines] = useState({});
  const [needPhone, setNeedPhone] = useState(false);

  const getNames = async () => {
    try {
      let data = await getAllMedicineData();
      let user = await getUserData(currentUser.uid);

      if (
        user.phoneNumber === "" ||
        user.phoneNumber == null ||
        user.phoneNumber === undefined
      ) {
        setNeedPhone(true);
      }

      let names = [];
      Object.entries(data).forEach(([key, val]) => {
        let obj = { name: val.name, label: val.label, value: val.value };
        names.push(obj);
      });
      setMedicines(names);
    } catch (e) {
      console.error(e);
    }
  };

  const [state, setValue] = useState({
    medicine: pillNames[0].value,
    value: pillNames[0].value,
    days: options[1].value,
    time: moment().format("HH:mm"),
    pillAmount: options[1].value,
    notificationTime: options[1].value,
    before: false,
    during: false,
    after: false,
  });

  useEffect(() => {
    getNames();
    AOS.init({
      duration: 1500,
    });
    AOS.refresh();
  }, []);

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const renderCustomInput = ({ ref }) => (
    <textarea
      ref={ref} // necessary
      placeholder="Datum"
      value={
        selectedDay
          ? ` ${selectedDay.day} ${months[selectedDay.month - 1]}`
          : ""
      }
      onChange={setSelectedDay}
      className="datePicker"
      readOnly={true}
    // a styling class
    />
  );

  // ON SUBMIT
  const onSubmit = async (e) => {
    let currentUser = await getCurrentUser();
    const uid = currentUser.uid;

    if (needPhone) {
      setMessage({
        error: "Gelieve een telefoonnummer toe te voegen bij je profiel",
      });
      setTimeout(() => {
        setMessage({});
      }, 5000);
      return;
    }

    if (
      state.before ||
      state.during ||
      state.after & selectedDay & state.medicine
    ) {
      let time = state.time;
      var a = time.split(":"); // split it at the colons
      let hour = Number(a[0]);
      let minute = Number(a[1]);

      let data = {};
      for (let i = 0; i < state.days; i++) {
        let uid = uuidv4();
        const date = toDate(
          selectedDay.year,
          selectedDay.month,
          selectedDay.day,
          hour,
          minute
        );

        date.setDate(date.getDate() + i);
        const targetDate = `${date.getDate()}/${date.getMonth() + 1
          }/${date.getFullYear()}`;

        let newDate = toTimestamp(date);
        data[uid] = {
          medicineName: state.medicine,
          medicineValue: state.value,
          targetDate: targetDate,
          numberOfDays: state.days,
          targetTime: state.time,
          Amount: state.pillAmount,
          beforeDinner: state.before,
          duringDinner: state.during,
          afterDinner: state.after,
          notification: state.notificationTime,
          timeStamp: newDate,
          isTaken: false,
          sendFirstReminder: false,
          sendAdminReminder: false,
        };

        const input = {
          text: "http%3A%2F%2Flocalhost%3A3000%2Fdashboard",
          phones: "32491066364",
          sendingDateTime: `${selectedDay.year}-${selectedDay.month}-${selectedDay.day} ${time}`,
        };

        const opts = {
          page: 1,
          limit: 10,
          lastId: 1,
        };
      }
      const result = await setSchedule(uid, data);
      for (let uid of Object.keys(data)) {

        const dateTime = new Date(data[uid].timeStamp * 1000);
        sendTextMessage(result.key, currentUser.phoneNumber, dateTime);
      }

      if (!result.message) {
        setMessage({
          succeed: "De data is succesvol toegevoegd.",
        });
        setValue({
          medicine: pillNames[0].value,
          days: options[0].value,
          time: moment().format("HH:mm"),
          pillAmount: options[0].value,
          notificationTime: options[0].value,
          before: false,
          during: false,
          after: false,
        });
        setTimeout(() => {
          setMessage({});
        }, 3000);
      } else if (result.message) {
        setMessage({
          error: result.message,
        });
      }
    } else {
      setMessage({
        error: "Datum of tijd is niet ingesteld",
      });
      return;
    }
  };

  return (
    <>
      <div className="area">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>

        <div className="container add-medicine pb-100" data-aos="fade">
          <div className="row">
            <div className="col-12">
              <h2 className="h2-style">Voeg een planning toe</h2>
              {message.error && (
                <p className="alert alert-danger">{message.error}</p>
              )}
              {message.succeed && (
                <p className="alert alert-success">{message.succeed}</p>
              )}

              <div className="option-container add-medicine__name">
                <h5>Medicijn naam</h5>
                {medicines.length > 0 && (
                  <Select
                    defaultValue={medicines[0]}
                    options={medicines}
                    onChange={(obj) =>
                      setValue({
                        ...state,
                        medicine: obj.label,
                        value: obj.value,
                      })
                    }
                  />
                )}
              </div>

              <div className="option-container add-medicine__date row">
                <div className="col-6">
                  <h5 className="add-medicine__date__title"> Datum: </h5>
                  <DatePicker
                    value={selectedDay}
                    onChange={setSelectedDay}
                    renderInput={renderCustomInput} // render a custom input
                    shouldHighlightWeekends
                  />
                </div>
                <div className="col-6">
                  <h5 className="add-medicine__date__title"> Periode: </h5>
                  <div className="rangeData">
                    <Select
                      defaultValue={options[0]}
                      options={options}
                      onChange={(obj) =>
                        setValue({ ...state, days: obj.value })
                      }
                      className={"rangeData__select"}
                    />
                    <p>dag(en)</p>
                  </div>
                </div>
              </div>

              <div className="option-container add-medicine__time row">
                <div className="col-6 ">
                  <TimePicker
                    style={{ width: 100 }}
                    showSecond={showSecond}
                    defaultValue={moment()}
                    className="add-medicine__time__timepicker"
                    onChange={(obj) =>
                      setValue({ ...state, time: obj.format("HH:mm") })
                    }
                  />
                </div>

                <div className="col-6 stripe">
                  <div className="rangeData">
                    <Select
                      defaultValue={options[0]}
                      options={options}
                      onChange={(obj) =>
                        setValue({ ...state, pillAmount: obj.value })
                      }
                    />
                    <p> pil(len)</p>
                  </div>
                </div>
              </div>

              <div className="add-medicine__option row">
                <h5 className="add-medicine__date__title">Moment van inname</h5>

                <fieldset className="checkbox-group">
                  <div className="checkbox">
                    <label className="checkbox-wrapper">
                      <input
                        type="checkbox"
                        className="checkbox-input"
                        name="before"
                        checked={state.before}
                        onChange={() =>
                          setValue({ ...state, before: !state.before })
                        }
                      />
                      <span className="checkbox-tile">
                        <span className="checkbox-icon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 50 50"
                          >
                            <path d="M 1 10 L 1 20 C 1 23.347656 2.429688 24.515625 3.375 25.28125 C 3.902344 25.707031 4 25.804688 4 26 L 4 36 C 4 39.511719 3.65625 42 6 42 C 8.476563 42 8 38.8125 8 36 L 8 26 C 8 25.847656 8.011719 25.777344 8.5625 25.375 C 9.527344 24.664063 11 23.59375 11 20.15625 L 11 10 L 9 10 L 9 19 C 9 19.550781 8.554688 20 8 20 C 7.445313 20 7 19.550781 7 19 L 7 10 L 5 10 L 5 19 C 5 19.550781 4.554688 20 4 20 C 3.445313 20 3 19.550781 3 19 L 3 10 Z M 43.9375 10 C 43.769531 10.007813 43.613281 10.066406 43.46875 10.15625 C 43.175781 10.339844 43 10.65625 43 11 L 43 35.15625 C 43 38.613281 42.539063 42 45 42 C 47.152344 42 47 38.6875 47 35 L 47 28 C 47 27.113281 47.367188 26.230469 47.78125 25.21875 C 48.355469 23.808594 49 22.21875 49 20 C 49 18.800781 49.726563 12.6875 44.4375 10.09375 C 44.28125 10.015625 44.105469 9.992188 43.9375 10 Z M 26.5 11 C 18.503906 11 12 17.503906 12 25.5 C 12 33.496094 18.503906 40 26.5 40 C 34.496094 40 41 33.496094 41 25.5 C 41 17.503906 34.496094 11 26.5 11 Z M 25.9375 16.03125 C 26.488281 16.007813 26.96875 16.417969 27 16.96875 C 27.03125 17.519531 26.613281 17.96875 26.0625 18 C 22.105469 18.226563 19 21.527344 19 25.5 C 19 29.636719 22.363281 33 26.5 33 C 30.472656 33 33.773438 29.894531 34 25.9375 C 34.03125 25.386719 34.480469 24.972656 35.03125 25 C 35.582031 25.03125 36 25.511719 35.96875 26.0625 C 35.683594 31.078125 31.53125 35 26.5 35 C 21.261719 35 17 30.738281 17 25.5 C 17 20.46875 20.921875 16.320313 25.9375 16.03125 Z"></path>
                          </svg>
                        </span>
                        <span className="checkbox-label">Voor</span>
                      </span>
                    </label>
                  </div>
                  <div className="checkbox">
                    <label className="checkbox-wrapper">
                      <input
                        type="checkbox"
                        className="checkbox-input"
                        name="during"
                        checked={state.during}
                        onChange={() =>
                          setValue({ ...state, during: !state.during })
                        }
                      />
                      <span className="checkbox-tile">
                        <span className="checkbox-icon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 50 50"
                          >
                            <path d="M 1 10 L 1 20 C 1 23.347656 2.429688 24.515625 3.375 25.28125 C 3.902344 25.707031 4 25.804688 4 26 L 4 36 C 4 39.511719 3.65625 42 6 42 C 8.476563 42 8 38.8125 8 36 L 8 26 C 8 25.847656 8.011719 25.777344 8.5625 25.375 C 9.527344 24.664063 11 23.59375 11 20.15625 L 11 10 L 9 10 L 9 19 C 9 19.550781 8.554688 20 8 20 C 7.445313 20 7 19.550781 7 19 L 7 10 L 5 10 L 5 19 C 5 19.550781 4.554688 20 4 20 C 3.445313 20 3 19.550781 3 19 L 3 10 Z M 43.9375 10 C 43.769531 10.007813 43.613281 10.066406 43.46875 10.15625 C 43.175781 10.339844 43 10.65625 43 11 L 43 35.15625 C 43 38.613281 42.539063 42 45 42 C 47.152344 42 47 38.6875 47 35 L 47 28 C 47 27.113281 47.367188 26.230469 47.78125 25.21875 C 48.355469 23.808594 49 22.21875 49 20 C 49 18.800781 49.726563 12.6875 44.4375 10.09375 C 44.28125 10.015625 44.105469 9.992188 43.9375 10 Z M 26.5 11 C 18.503906 11 12 17.503906 12 25.5 C 12 33.496094 18.503906 40 26.5 40 C 34.496094 40 41 33.496094 41 25.5 C 41 17.503906 34.496094 11 26.5 11 Z M 25.9375 16.03125 C 26.488281 16.007813 26.96875 16.417969 27 16.96875 C 27.03125 17.519531 26.613281 17.96875 26.0625 18 C 22.105469 18.226563 19 21.527344 19 25.5 C 19 29.636719 22.363281 33 26.5 33 C 30.472656 33 33.773438 29.894531 34 25.9375 C 34.03125 25.386719 34.480469 24.972656 35.03125 25 C 35.582031 25.03125 36 25.511719 35.96875 26.0625 C 35.683594 31.078125 31.53125 35 26.5 35 C 21.261719 35 17 30.738281 17 25.5 C 17 20.46875 20.921875 16.320313 25.9375 16.03125 Z"></path>
                          </svg>
                        </span>
                        <span className="checkbox-label">Tijdens</span>
                      </span>
                    </label>
                  </div>
                  <div className="checkbox">
                    <label className="checkbox-wrapper">
                      <input
                        type="checkbox"
                        className="checkbox-input"
                        name="after"
                        checked={state.after}
                        onChange={() =>
                          setValue({ ...state, after: !state.after })
                        }
                      />
                      <span className="checkbox-tile">
                        <span className="checkbox-icon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 50 50"
                          >
                            <path d="M 1 10 L 1 20 C 1 23.347656 2.429688 24.515625 3.375 25.28125 C 3.902344 25.707031 4 25.804688 4 26 L 4 36 C 4 39.511719 3.65625 42 6 42 C 8.476563 42 8 38.8125 8 36 L 8 26 C 8 25.847656 8.011719 25.777344 8.5625 25.375 C 9.527344 24.664063 11 23.59375 11 20.15625 L 11 10 L 9 10 L 9 19 C 9 19.550781 8.554688 20 8 20 C 7.445313 20 7 19.550781 7 19 L 7 10 L 5 10 L 5 19 C 5 19.550781 4.554688 20 4 20 C 3.445313 20 3 19.550781 3 19 L 3 10 Z M 43.9375 10 C 43.769531 10.007813 43.613281 10.066406 43.46875 10.15625 C 43.175781 10.339844 43 10.65625 43 11 L 43 35.15625 C 43 38.613281 42.539063 42 45 42 C 47.152344 42 47 38.6875 47 35 L 47 28 C 47 27.113281 47.367188 26.230469 47.78125 25.21875 C 48.355469 23.808594 49 22.21875 49 20 C 49 18.800781 49.726563 12.6875 44.4375 10.09375 C 44.28125 10.015625 44.105469 9.992188 43.9375 10 Z M 26.5 11 C 18.503906 11 12 17.503906 12 25.5 C 12 33.496094 18.503906 40 26.5 40 C 34.496094 40 41 33.496094 41 25.5 C 41 17.503906 34.496094 11 26.5 11 Z M 25.9375 16.03125 C 26.488281 16.007813 26.96875 16.417969 27 16.96875 C 27.03125 17.519531 26.613281 17.96875 26.0625 18 C 22.105469 18.226563 19 21.527344 19 25.5 C 19 29.636719 22.363281 33 26.5 33 C 30.472656 33 33.773438 29.894531 34 25.9375 C 34.03125 25.386719 34.480469 24.972656 35.03125 25 C 35.582031 25.03125 36 25.511719 35.96875 26.0625 C 35.683594 31.078125 31.53125 35 26.5 35 C 21.261719 35 17 30.738281 17 25.5 C 17 20.46875 20.921875 16.320313 25.9375 16.03125 Z"></path>
                          </svg>
                        </span>
                        <span className="checkbox-label">Na</span>
                      </span>
                    </label>
                  </div>
                </fieldset>
                <div className="rangeData">
                  <Select
                    defaultValue={options[0]}
                    options={options}
                    onChange={(obj) =>
                      setValue({ ...state, notificationTime: obj.value })
                    }
                  />
                  <p> min voor/tijdens/na het eten </p>
                </div>
              </div>

              <div className="d-grid gap-2  justify-content-center">
                <button className="btn " type="button" onClick={onSubmit}>
                  Voeg toe aan planning
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddMedicine;
