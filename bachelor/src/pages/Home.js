import React, { useState } from 'react';
import Week from '../components/Week';
import Reminder from '../components/Reminder';
import Lottie from 'react-lottie';
import plants from '../assets/lotties/plants.json';
let currentUser = JSON.parse(localStorage.getItem('firebase:currentUser'));

const Home = (props) => {
  const [dateProp, setDateProp] = useState();
  const uid = currentUser.uid;

  const handleSetDate = (dataFromChild) => {
    setDateProp(dataFromChild);
  };

  const CheckMorning = () => {
    let today = new Date();
    let curHr = today.getHours();

    if (curHr < 12) {
      return 'Good morning ';
    } else if (curHr < 18) {
      return 'Good afternoon ';
    } else {
      return 'Good evening ';
    }
  };

  return (
    <div className='full-height'>
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
        <div className='container-fluid home'>
          <div className='row'>
            <div className='col-12'>
              <h1 className='h1-style pt-50'>
                <CheckMorning />
                <br />
                {currentUser.displayName ? currentUser.displayName : ''}
              </h1>
              <p> Hieronder zie je dagelijkse overzicht </p>
            </div>
            <Week handleSetDate={handleSetDate} />
          </div>
        </div>
      </div>

      <div className='overview'>
        <div className='container'>
          <div className='row'>
            <div className='col-12'>
              <h3 className='overview__activity'>Today</h3>
              {dateProp && <Reminder handleDate={dateProp} uid={uid} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
