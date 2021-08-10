import React from 'react'
import Lottie from 'react-lottie';
import sitting from '../../assets/lotties/sitting.json'
import Users from '../components/users';

function Clients() {

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: sitting,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
    <>
      <div className='dashboard-intro'>
        <Lottie
          options={defaultOptions}
          height={'40%'}
          width={'20%'}
          className={'test'}
        />
      </div>

      <Users />
    </>
  )
}

export default Clients
