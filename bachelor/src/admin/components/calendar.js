import React, { useState, useEffect } from 'react';
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import { Calendar } from '@hassanmojab/react-modern-calendar-datepicker';
import { getAllData } from '../../services/auth.services';
import AllEvents from '../../components/AllEvents';
import AOS from 'aos';
import "aos/dist/aos.css"

const Calender = (props) => {
  const [state, setState] = useState([]);
  const [events, setEvents] = useState({});
  const [selectedDay, setSelectedDay] = useState(null);


  useEffect(() => {
    let uid = props.uid;
    
    let dates = []
    Object.entries(uid).forEach(([key, val]) => {

      let date = val.targetDate.split('/')
      let day = Number(date[0])
      let month = Number(date[1])
      let year = Number(date[2])
      let obj 
      if (val.isTaken) {
        obj = { year: year, month: month, day: day, className: 'orangeDay' }
      }else {
        obj = { year: year, month: month, day: day, className: 'redDay' }
      }
      dates.push(obj)
    })

    setState(dates)
    setEvents(uid)

  }, [props.uid]);



  return (
    <>
      <div className="all-calendar">
           
        <h5 className='pb-50 text-center'>Overzicht van alle evenementen</h5>

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
