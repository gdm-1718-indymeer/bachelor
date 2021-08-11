import React, { useContext } from 'react'
import { useHistory, Redirect } from "react-router-dom";
import firebase from '../../config/firebaseConfig'
import AppContext from '../../services/context.services';


function BaseLayout(props) {
  const { children } = props
  let history = useHistory();
  const appContext = useContext(AppContext);
  console.log(appContext)

  if (appContext.loginStatus === 'LOGGED_OUT') {
    return <Redirect to={`/login?callback=${window.location.origin}${props.location.pathname}${props.location.search}`} />;
  }

  if (!firebase.auth().currentUser) {
    return < Redirect to='/login' />
  }


  return (
    <div>
      <div className='go-back' onClick={() => history.goBack()}>
        <svg xmlns="http://www.w3.org/2000/svg" className='icon--back' viewBox="0 0 30 30"><path d="M 6.9804688 8.9902344 A 1.0001 1.0001 0 0 0 6.2929688 9.2929688 L 1.3808594 14.205078 A 1.0001 1.0001 0 0 0 1.3769531 15.792969 A 1.0001 1.0001 0 0 0 1.3828125 15.796875 L 6.2929688 20.707031 A 1.0001 1.0001 0 1 0 7.7070312 19.292969 L 4.4140625 16 L 28 16 A 1.0001 1.0001 0 1 0 28 14 L 4.4140625 14 L 7.7070312 10.707031 A 1.0001 1.0001 0 0 0 6.9804688 8.9902344 z"></path></svg>
        Keer terug
      </div>

      {children}

    </div>
  )
}

export default BaseLayout