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
          <div className='row'>
            <div className='col-4'>
              <Lottie 
                  options={defaultOptions}
                  height={'100%'}
                  width={'80%'}
                  className={'test'}
              />
            </div>
            <div className='col-8 dashboard-intro__text'>
              <p>Dag Admin! <br/> Hier onder zie je een overzicht van de gebruikers waar je toegang tot hebt. Click op een profiel om de data's te bekijken.</p>
            </div>
          </div>
        </div>
      <Users />
    </>
  )
}

export default Clients
