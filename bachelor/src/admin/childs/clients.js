import React, { useEffect, useCallback , useState} from 'react'
import Lottie from 'react-lottie';
import sitting from '../../assets/lotties/sitting.json'
import { myUsersAcces } from '../../services/auth.services';
import Users from '../components/users';
let currentUser = JSON.parse(localStorage.getItem('firebase:currentUser'));

const Clients = () => {
  const [state, setState] = useState([])

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: sitting,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  const getUsers = (async (uid) => {
    try {
        let response = await myUsersAcces(uid);
        setState(response)
        console.log(state)
      
    } catch (e) {
        console.error(e);
    }
});

  useEffect(() => {
    const uid = currentUser.uid
    getUsers(uid);
  }, []);

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
              <p>Dag {currentUser.displayName}! <br/> Hier onder zie je een overzicht van de gebruikers waar je toegang tot hebt. Klik op een profiel om de data's te bekijken.</p>
            </div>
          </div>
        </div>
        <div className='container'>
          {Object.keys(state) !== 0 ? <Users mapUsers={state} /> : <h4>Loading data</h4>}
      </div>
    </>
  )
}

export default Clients
