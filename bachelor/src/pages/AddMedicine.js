import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import moment from 'moment';
import TimePicker from 'rc-time-picker';
import { setSchedule, uuidv4 } from '../services/auth.services';
import { getAllMedicineData } from '../services/auth.services';
import AOS from 'aos';
import "aos/dist/aos.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBreadSlice,faCoffee,faUtensils,} from '@fortawesome/free-solid-svg-icons';

import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker from '@hassanmojab/react-modern-calendar-datepicker';


import 'rc-time-picker/assets/index.css';
const textmagicClient = require('textmagic-client');

const client = textmagicClient.ApiClient.instance;
const auth = client.authentications['BasicAuth'];
const api = new textmagicClient.TextMagicApi();

auth.username = process.env.REACT_APP_SMS_USERNAME;
auth.password = 'ZAH7BlldVKUcm5Dv6kyGKPCfEqCD9C'; //process.env.REACT_APP_SMS_API;

const showSecond = false;

const pillNames = [
  { value: 'Paracetamol', label: 'Paracetamol' },
  { value: 'Ibuprofen', label: 'Ibuprofen' },
];

const options = [];
for (let i = 1; i < 100; i += 1) {
  const option = {
    value: `${i -1}`,
    label: `${i}`,
  };
  options.push(option);
}

let toDate = (year, month, day, hour, minute) => {
  console.log(year, month, day, hour, minute)
  return new Date(year, month - 1, day, hour, minute);
};

const toTimestamp = (date) => {
  return Math.floor(date.getTime() / 1000);
};

const AddMedicine = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [message, setMessage] = useState(false);
  const [medicines, setMedicines] = useState({});

  const getNames = (async () => {
    try {
      let data = await getAllMedicineData();
      let names = []
      Object.entries(data).forEach(([key, val]) => {
        let obj = { name: val.name, label: val.label, value: val.value}
        names.push(obj)
      })
      setMedicines(names);
    } catch (e) {
      console.error(e);
    }
  });

  const [state, setValue] = useState({
    medicine: pillNames[0].value,
    value: pillNames[0].value,
    days: options[1].value,
    time: moment().format('HH:mm'),
    pillAmount: options[1].value,
    notificationTime: options[1].value,
    before: false,
    during: false,
    after: false,
  });

  useEffect(() => {
    getNames();
    AOS.init({
      duration: 1500
    });
    AOS.refresh();
  }, []);

  let months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const renderCustomInput = ({ ref }) => (
    <textarea
      ref={ref} // necessary
      placeholder='Datum'

      value={
        selectedDay
          ? ` ${selectedDay.day} ${months[selectedDay.month - 1]}`
          : ''
      }
      onChange={setSelectedDay}
      className='datePicker'
      readOnly={true}
      // a styling class
    />
  );

  // ON SUBMIT
  const onSubmit = async (e) => {
    let currentUser = JSON.parse(localStorage.getItem('firebase:currentUser'));
    const uid = currentUser.uid;

    if (state.before || state.during || state.after & selectedDay & state.medicine) {

      let time = state.time;
      var a = time.split(':'); // split it at the colons
      let hour = Number(a[0]);
      let minute = Number(a[1]);

      let data = {};
      for (let i = 0; i < state.days; i++) {
        let uid = uuidv4();
        console.log(selectedDay)
        const date = toDate(
          selectedDay.year,
          selectedDay.month,
          selectedDay.day,
          hour,
          minute,
        );

        date.setDate(date.getDate() + i);
        const targetDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

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
          text: 'http%3A%2F%2Flocalhost%3A3000%2Fdashboard',
          phones: '32491066364',
          sendingDateTime: `${selectedDay.year}-${selectedDay.month}-${selectedDay.day} ${time}`,
        };

        const opts = {
          page: 1,
          limit: 10,
          lastId: 1,
        };
        // api
        //   .getAllOutboundMessages(opts)
        //   .then(function (data) {
        //     console.log(data);
        //   })
        //   .catch(function (err) {
        //     console.error(err);
        //   });
        // api
        //   .sendMessage(input)
        //   .then(function (data) {
        //     console.log('whooo', data);
        //   })
        //   .catch(function (err) {
        //     console.error(err);
        //   });
      }

      const result = await setSchedule(uid, data);

      if (!result.message) {
        setMessage({
          succeed: 'De data is succesvol toegevoegd.',
        });
        setValue({
          medicine: pillNames[0].value,
          days: options[0].value,
          time: moment().format('HH:mm'),
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
        error: 'Datum of tijd is niet ingesteld',
      });
      return;
    }
  };

  return (
    <>
      <div className='area'>
        <ul className='circles'>
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

        <div className='container add-medicine pb-100' data-aos="fade">
          <div className='row'>
            <div className='col-12'>
              <h2 className='h2-style'>Voeg een planning toe</h2>
              {message.error && (
                <p className='alert alert-danger'>{message.error}</p>
              )}
              {message.succeed && (
                <p className='alert alert-success'>{message.succeed}</p>
              )}

              <div className='option-container add-medicine__name'>
                <h5>Medicijn naam</h5>
                {medicines.length > 0 && (
                  <Select
                    defaultValue={medicines[0]}
                    options={medicines}
                    onChange={(obj) =>
                      setValue({ ...state, medicine: obj.label, value:obj.value })
                    }
                  />
                )}
              </div>

              <div className='option-container add-medicine__date row'>
                <div className='col-6'>
                  <h5 className='add-medicine__date__title'> Datum: </h5>
                  <DatePicker
                    value={selectedDay}
                    onChange={setSelectedDay}
                    renderInput={renderCustomInput} // render a custom input
                    shouldHighlightWeekends
                  />
                </div>
                <div className='col-6'>
                  <h5 className='add-medicine__date__title'> Periode: </h5>
                  <div className='rangeData'>
                    <Select
                      defaultValue={options[0]}
                      options={options}
                      onChange={(obj) =>
                        setValue({ ...state, days: obj.value })
                      }
                      className={'rangeData__select'}
                    />
                    <p>dag(en)</p>
                  </div>
                </div>
              </div>

              <div className='option-container add-medicine__time row'>
                <div className='col-6 '>
                  <TimePicker
                    style={{ width: 100 }}
                    showSecond={showSecond}
                    defaultValue={moment()}
                    className='add-medicine__time__timepicker'
                    onChange={(obj) =>
                      setValue({ ...state, time: obj.format('HH:mm') })
                    }
                  />
                </div>

                <div className='col-6 stripe'>
                  <div className='rangeData'>
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

              <div className='add-medicine__option row'>
                <h5 className='add-medicine__date__title'>Moment van inname</h5>

                <fieldset className='checkbox-group'>
                  <div className='checkbox'>
                    <label className='checkbox-wrapper'>
                      <input
                        type='checkbox'
                        className='checkbox-input'
                        name='before'
                        checked={state.before}
                        onChange={() =>
                          setValue({ ...state, before: !state.before })
                        }
                      />
                      <span className='checkbox-tile'>
                        <span className='checkbox-icon'>
                          <FontAwesomeIcon
                            className='icon--food'
                            icon={faCoffee}
                          />
                        </span>
                        <span className='checkbox-label'>Voor</span>
                      </span>
                    </label>
                  </div>
                  <div className='checkbox'>
                    <label className='checkbox-wrapper'>
                      <input
                        type='checkbox'
                        className='checkbox-input'
                        name='during'
                        checked={state.during}
                        onChange={() =>
                          setValue({ ...state, during: !state.during })
                        }
                      />
                      <span className='checkbox-tile'>
                        <span className='checkbox-icon'>
                          <FontAwesomeIcon
                            className='icon--food'
                            icon={faBreadSlice}
                          />
                        </span>
                        <span className='checkbox-label'>Tijdens</span>
                      </span>
                    </label>
                  </div>
                  <div className='checkbox'>
                    <label className='checkbox-wrapper'>
                      <input
                        type='checkbox'
                        className='checkbox-input'
                        name='after'
                        checked={state.after}
                        onChange={() =>
                          setValue({ ...state, after: !state.after })
                        }
                      />
                      <span className='checkbox-tile'>
                        <span className='checkbox-icon'>
                          <FontAwesomeIcon
                            className='icon--food'
                            icon={faUtensils}
                          />
                        </span>
                        <span className='checkbox-label'>Na</span>
                      </span>
                    </label>
                  </div>
                </fieldset>
                <div className='rangeData'>
                  <Select
                    defaultValue={options[0]}
                    options={options}
                    onChange={(obj) =>
                      setValue({ ...state, notificationTime: obj.value })
                    }
                  />
                  <p> min / voor het eten </p>
                </div>
              </div>

              <div className='d-grid gap-2  justify-content-center'>
                <button className='btn ' type='button' onClick={onSubmit}>
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
