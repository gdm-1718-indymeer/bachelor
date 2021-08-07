import React from 'react'
import { useHistory, Redirect } from "react-router-dom";
import firebase from '../../config/firebaseConfig'


function BaseLayout(props) {
  const { window, children } = props
  let history = useHistory();

  if (!firebase.auth().currentUser) {
    return < Redirect to='/login' />
  }


  return (
    <div>
      <button onClick={() => history.goBack()}>Back</button>

      {children}

    </div>
  )
}

export default BaseLayout