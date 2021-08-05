import React, { useState, useEffect , useCallback} from 'react'
import { getPreviousData, getNextData } from "../../services/auth.services";
import { CountdownCircleTimer, remainingTime } from 'react-countdown-circle-timer';
import Lottie from 'react-lottie';
import confetti from '../../assets/lotties/confetti.json'




const Timer = () => {

  const [previous, setPrevious] = useState({});
  const [next, setNext] = useState({});
  const [time, setTime] = useState({});


  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: confetti,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  const toTimestamp = (year,month,day,hour, minute, second) =>{
    return  Math.floor((new Date(year,month-1,day,hour, minute, second)).getTime() / 1000) ;
  }


  const calculateTime = (previous, next) => {

    setNext(next)
    const dateObjectPrev = new Date((previous.timeStamp) * 1000) // convert back from epoch
    const dateObjectNext = new Date((next.timeStamp) * 1000) // convert back from epoch
    let time = (dateObjectNext.getTime() - new Date().getTime()) / 1000
    let prev = (dateObjectPrev.getTime() - dateObjectNext.getTime()) / 1000
    setTime({
      time: time,
      prev: prev
    })

  }
  
  const getEvents = useCallback(async (uid, time) => {
      try {
          const previousDate = await getPreviousData(uid, time);
          const nextDate = await getNextData(uid, time);

          calculateTime(previousDate,nextDate )

      } catch (e) {
          console.error(e);
      }
  });

    
  useEffect (() => {
    let currentUser = JSON.parse(localStorage.getItem('firebase:currentUser'))
    const uid = currentUser.uid
    var d = new Date();
    let time = toTimestamp(d.getFullYear(), d.getMonth() + 1, d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds() )

    getEvents(uid, time);

  }, []);

  if (remainingTime === 0) {
    return <div className="timer">It's time to take your pill</div>;
  }
 
  const children = ({ remainingTime }) => {
    const days = Math.floor(remainingTime / (24 * 3600))
    const hours = Math.floor(remainingTime / 3600)
    const minutes = Math.floor((remainingTime % 3600) / 60)
    const seconds = remainingTime % 60

    return (
      <div className="inner">
      <svg xmlns="http://www.w3.org/2000/svg" width="41.982" height="37.662" viewBox="0 0 41.982 37.662">
      <g id="Icons_heart" data-name="Icons/ heart" transform="translate(1.425 1.038)">
        <g id="Icons_heart-2" data-name="Icons/ heart">
          <path id="Path" d="M35.925,3.037h0a9.875,9.875,0,0,0-14.25,0l-1.95,2.1a.681.681,0,0,1-.75,0l-1.95-2.1a9.7,9.7,0,0,0-14.1,0h0a10.7,10.7,0,0,0,0,14.7l2.4,2.4,13.8,14.25a.681.681,0,0,0,.75,0l13.8-14.25,2.4-2.4A10.552,10.552,0,0,0,35.925,3.037Z" transform="translate(0.075 0.463)" fill="none" stroke="#205072" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3"/>
          <path id="Path-2" data-name="Path" d="M0,4.5H4.5l3-3,3,6,3-7.5,3,4.5H21" transform="translate(9 11)" fill="none" stroke="#205072" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3"/>
        </g>
      </g>
    </svg>
      <br/>
    <p>{days}d {hours}h {minutes}m {seconds} s</p>
    </div>
    );
  }
    return (
      <div className="timer-background">
          <div className="wave">
            <div className="wave__overlay"></div>
            <Lottie 
              options={defaultOptions}
              height={'100%'}
              width={'100%'}
              className='test'
            />
          </div>

          <div className="countdown-wrapper">
              <h2 className="white pb-50">Je volgende pil</h2>
              <div className="pillName">
                <h3 className="pillName__title">{next ?
                  next.medicineName : " Loading"} 
                </h3>
              </div>

              <div className="countdown-wrapper__timer">
                { time.time &&
                 <CountdownCircleTimer
                    onComplete={() => {
                      // do your stuff here
                      return [true, 1500] // repeat animation in 1.5 seconds
                    }}
                    isPlaying
                    duration={time.prev}
                    initialRemainingTime={time.time}
                    isLinearGradient={true}
                    colors="#56c596"
                    rotation={'rotation'}
                  >
                    {children}
                  </CountdownCircleTimer>}
                </div>

                <button className='countdown-wrapper__button btn'>
                  Bekijk de details
                </button>
              </div>

        </div>
    )
}

export default Timer
