import React, { useState, useEffect , useCallback} from 'react'
import { getPreviousData } from "../../services/auth.services";
import { format } from 'date-fns';
import moment from 'moment';
import { CountdownCircleTimer, remainingTime } from 'react-countdown-circle-timer';



const Timer = () => {

  const [tasks, setTasks] = useState({});

  const getEvents = useCallback(async (uid, time) => {
      try {
          const response = await getPreviousData(uid, time);
          setTasks(response)
         await  console.log(tasks)

      } catch (e) {
          console.error(e);
      }
  });
  const toTimestamp = (year,month,day,hour, minute, second) =>{
    var datum = new Date(Date.UTC(year,month-1,day,hour, minute, second));
    return datum.getTime()/1000;
   }
    
  useEffect (() => {
    let currentUser = JSON.parse(localStorage.getItem('firebase:currentUser'))
    const uid = currentUser.uid
    let time = toTimestamp(moment().year(), moment().month(), moment().day(), moment().hour(), moment().minute(), moment().second() )
    getEvents(uid, time);

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
          <div className="wave">
            <div className="wave-bk"><span></span></div>
            <div className="wave-fr"><span></span></div>
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
