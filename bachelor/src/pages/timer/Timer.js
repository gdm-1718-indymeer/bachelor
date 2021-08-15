import React, { useState, useEffect } from 'react';
import { getPreviousData, getNextData, setCurrentData} from '../../services/auth.services';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import Lottie from 'react-lottie';
import confetti from '../../assets/lotties/confetti.json';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import "aos/dist/aos.css"
let currentUser = JSON.parse(localStorage.getItem('firebase:currentUser'));

const Timer = () => {
  const [load, setLoad] = useState({});
  const [next, setNext] = useState(false);
  const [time, setTime] = useState({});

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: confetti,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const toTimestamp = (year, month, day, hour, minute, second) => {
    return Math.floor(
      new Date(year, month - 1, day, hour, minute, second).getTime() / 1000
    );
  };

  const calculateTime = (previous, next) => {
    if (next.length > 0) {
      let today = new Date().getTime() / 1000;
      let dateObjectPrev = today;

      if (previous) {
        dateObjectPrev = previous.timeStamp;
      }

      const dateObjectNext = next[0].timeStamp;
      let time = dateObjectNext - today;
      let prev = (dateObjectPrev - dateObjectNext)
      setTime({
        time: time,
        prev: prev,
      });
    }
  };

  const wantNext = () => {
    const uid = currentUser.uid;
    var d = new Date();
    let time = toTimestamp(
      d.getFullYear(),
      d.getMonth() + 1,
      d.getDate(),
      d.getHours(),
      d.getMinutes() - 20,
      d.getSeconds()
    );

    AOS.init({
      duration: 1000
    });
    AOS.refresh();

    getEvents(uid, time);
  } 

  const getEvents = (async (uid, time) => {
    try {
      const previousDate = await getPreviousData(uid, time);
      const nextDate = await getNextData(uid, time);

      setNext(nextDate);

      calculateTime(previousDate, nextDate);
    } catch (e) {
      console.error(e);
    }
  });

  useEffect(() => {
    const uid = currentUser.uid;
    var d = new Date();
    let time = toTimestamp(
      d.getFullYear(),
      d.getMonth() + 1,
      d.getDate(),
      d.getHours(),
      d.getMinutes() - 20,
      d.getSeconds()
    );

    AOS.init({
      duration: 1000
    });
    AOS.refresh();

    getEvents(uid, time);
  }, []);
 
  const tookMedicine = async () => {
    // let currentUser = JSON.parse(localStorage.getItem('firebase:currentUser'));
    // const uid = currentUser.uid;
    // await setCurrentData(uid, next[1], { ...next[0], isTaken: true })
    // var d = new Date();
    // let time = toTimestamp(
    //   d.getFullYear(),
    //   d.getMonth() + 1,
    //   d.getDate(),
    //   d.getHours(),
    //   d.getMinutes() - 20,
    //   d.getSeconds()
    // );

    // await getEvents(uid, time)
  }
  const children = ({ remainingTime }) => {
    let d = Math.floor(remainingTime / (3600 * 24));
    let h = Math.floor((remainingTime % (3600 * 24)) / 3600);
    let m = Math.floor((remainingTime % 3600) / 60);
    let s = Math.floor(remainingTime % 60);
    return (
      <div className='inner'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='41.982'
          height='37.662'
          viewBox='0 0 41.982 37.662'>
          <g
            id='Icons_heart'
            data-name='Icons/ heart'
            transform='translate(1.425 1.038)'>
            <g id='Icons_heart-2' data-name='Icons/ heart'>
              <path
                id='Path'
                d='M35.925,3.037h0a9.875,9.875,0,0,0-14.25,0l-1.95,2.1a.681.681,0,0,1-.75,0l-1.95-2.1a9.7,9.7,0,0,0-14.1,0h0a10.7,10.7,0,0,0,0,14.7l2.4,2.4,13.8,14.25a.681.681,0,0,0,.75,0l13.8-14.25,2.4-2.4A10.552,10.552,0,0,0,35.925,3.037Z'
                transform='translate(0.075 0.463)'
                fill='none'
                stroke='#205072'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeMiterlimit='10'
                strokeWidth='3'
              />
              <path
                id='Path-2'
                data-name='Path'
                d='M0,4.5H4.5l3-3,3,6,3-7.5,3,4.5H21'
                transform='translate(9 11)'
                fill='none'
                stroke='#205072'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeMiterlimit='10'
                strokeWidth='3'
              />
            </g>
          </g>
        </svg>
        <br />
        <p>
          {d}d {h}h {m}m {s} s
        </p>
      </div>
    );
  };
  return (
    <div className='timer-background'>
      <div className='wave'>
        {next.length > 0 ? (
          <div data-aos="fade">
            <div className='wave__overlay'></div>

            <Lottie
              options={defaultOptions}
              height={'100%'}
              width={'100%'}
              className='test'
            />
          </div>) : (<div className='countdown-wrapper' data-aos="fade">
            <h3 className='white pb-50'>Oeps! Het lijkt alsof je nog geen datums hebt toegevoegd</h3>
            <Link
              className='btn btn-white pb-50'
              to={`/add`}>
              Voeg nu data toe
            </Link>
          </div>)}
      </div>
      {next.length > 0 ? (
        <div className='countdown-wrapper' data-aos="fade">
          <h2 className='white pb-50'>Je volgende pil</h2>
          <div className='pillName'>
            <h3 className='pillName__title'>{next && next[0].medicineName}</h3>
          </div>

          <div className='countdown-wrapper__timer'>
            {time.time && (
              <CountdownCircleTimer
                onComplete={() => {
                  wantNext()
                  // do your stuff here
                  return [false, 1500]; // repeat animation in 1.5 seconds
                }}
                isPlaying
                duration={time.prev}
                initialRemainingTime={time.time}
                isLinearGradient={true}
                colors='#56c596'
                rotation={'rotation'}>
                {children}
              </CountdownCircleTimer>
            )}
          </div>
          {/* {time.time <= 60 * 15 ?
            <button className='countdown-wrapper__button btn' onClick={tookMedicine} value="Ik heb mijn medicijn genomen"
            >Ik heb mijn pil genomen!</button> : null} */}
          <Link
            className='countdown-wrapper__button btn'
            to={`reminder/${next[1]}`}>
            Bekijk de details
          </Link>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Timer;
