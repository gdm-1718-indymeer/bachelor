import React, { useState } from 'react';
import Week from '../components/Week';
import Reminder from '../components/Reminder';


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
      return 'Goedemorgen ';
    } else if (curHr < 18) {
      return 'Goedemiddag ';
    } else {
      return 'Goedenavond ';
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
            <div className='col-12 introduction'>
              <h1 className='h1-style pt-50 '>
                <span><CheckMorning /></span>
                <br />
                {currentUser.displayName ? currentUser.displayName : ''}
              </h1>
              <p> Hieronder zie je jouw dagelijkse overzicht </p>
            </div>
            <Week handleSetDate={handleSetDate} />
          </div>
        </div>
      </div>

      <div className='overview'>
        <div className='container'>
          <div className='row'>
            <div className='col-12'>
              <h3 className='overview__activity'>Reminders van de dag</h3>
              {dateProp &&
                <Reminder handleDate={dateProp} uid={uid} />
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
