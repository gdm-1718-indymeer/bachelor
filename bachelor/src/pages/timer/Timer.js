import React, { useState, useEffect , useCallback} from 'react'
import { getScheduleByDate } from "../../services/auth.services";
import { format } from 'date-fns'
import { CountdownCircleTimer, remainingTime } from 'react-countdown-circle-timer';



const Timer = () => {

  const [tasks, setTasks] = useState({});

  const getEvents = useCallback(async (uid, date) => {
      try {
          const response = await getScheduleByDate(uid, date);
          setTasks(response)
          console.log(tasks)

      } catch (e) {
          console.error(e);
      }
  });
    
  useEffect (() => {
    let currentUser = JSON.parse(localStorage.getItem('firebase:currentUser'))
    const uid = currentUser.uid
    let dateToday = new Date;
    dateToday = format(dateToday, 'd/M/yyyy');
    getEvents(uid, dateToday);

  }, []);

  if (remainingTime === 0) {
    return <div className="timer">It's time to take your pill</div>;
  }
 
  const children = ({ remainingTime }) => {
    const hours = Math.floor(remainingTime / 3600)
    const minutes = Math.floor((remainingTime % 3600) / 60)
    const seconds = remainingTime % 60

    return `${hours}h ${minutes}m ${seconds}s`
  }
    return (
      <div className="timer-background">
          <div class="wave">
            <div class="wave-bk"><span></span></div>
            <div class="wave-fr"><span></span></div>
          </div>

          <div className="countdown-wrapper">
              <h2 className="white pb-100">Je volgende pil</h2>
              <CountdownCircleTimer
                onComplete={() => {
                  // do your stuff here
                  return [true, 1500] // repeat animation in 1.5 seconds
                }}
                isPlaying
                duration={500}
                colors={[
                  ['#53ade4', 0.33],
                  ['#53ade4', 0.33],
                  ['#53ade4', 0.33],
                ]}
              >
                {children}
                </CountdownCircleTimer>

                <button className='btn'>
                  Snooze
                </button>
              </div>

        </div>
    )
}

export default Timer
