import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { Navigation } from './index';
import firebase from '../../config/firebaseConfig';
import AppContext from '../../services/context.services';

function BaseLayout(props) {
  const { window, children } = props;
  const appContext = useContext(AppContext);
  if (appContext.loginStatus === 'LOGGED_OUT') {
    return <Redirect to='/login' />;
  }

  return (
    <div>
      {children}
      <Navigation path={props.location.pathname}></Navigation>
    </div>
  );
}

export default BaseLayout;
