import React, { useState, useEffect, useCallback } from 'react';
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import { Calendar } from '@hassanmojab/react-modern-calendar-datepicker';
import { getAllData } from '../../../services/auth.services';
import AllEvents from '../../../components/AllEvents';
import AOS from 'aos';
import "aos/dist/aos.css"
let currentUser = JSON.parse(localStorage.getItem('firebase:currentUser'));


const Calender = () => {
  const [state, setState] = useState([]);
  const [events, setEvents] = useState({});
  const [selectedDay, setSelectedDay] = useState(null);


  const getAll = useCallback(async (uid) => {
    try {
      const response = await getAllData(uid);
      if (response) {
        let dates = []
        Object.entries(response).forEach(([key, val]) => {

          let date = val.targetDate.split('/')
          let day = Number(date[0])
          let month = Number(date[1])
          let year = Number(date[2])
          let obj = { year: year, month: month, day: day, className: 'orangeDay' }
          dates.push(obj)
        })

        setState(dates)
        setEvents(response)

      }
    } catch (e) {
      console.error(e);
    }
  });

  useEffect(() => {
    let uid = currentUser.uid;
    
    getAll(uid);
  }, []);



  return (
    <>
      <div className="all-calendar">
        <div className='container'>
          <div className='row'>
            <div className='col-12'>
                <h1 className='pb-50'>Overzicht van alle evenementen</h1>
            </div>
          </div>
        </div>
        {Object.keys(state) !== 0 && Object.keys(events) !== 0
          &&
          <>
            <Calendar
              value={selectedDay}
              onChange={setSelectedDay}
              shouldHighlightWeekends
              customDaysClassName={state ?? {}}
            />
            <AllEvents events={events} date={selectedDay} />
          </>
        }
      </div>
    </>

  );
}

export default Calender
