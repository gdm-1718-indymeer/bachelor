import React from 'react';
import { Redirect } from 'react-router-dom';
import { Navigation } from './index';
import firebase from '../../config/firebaseConfig';

function BaseLayout(props) {
  const { window, children } = props;

  /*if (!firebase.auth().currentUser) {
    return < Redirect to='/login' />
  }
*/
  return (
    <div>
      {children}
      <Navigation path={props.location.pathname}></Navigation>
    </div>
  );
}

export default BaseLayout;
