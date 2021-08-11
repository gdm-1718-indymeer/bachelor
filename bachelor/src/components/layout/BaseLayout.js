import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import AppContext from '../../services/context.services';
import { Navigation } from './index';

function BaseLayout(props) {
  const { children } = props;
  const appContext = useContext(AppContext);
  if (appContext.loginStatus === 'LOGGED_OUT') {
    return <Redirect to={`/login?callback=${window.location.origin}${props.location.pathname}${props.location.search}`} />;
  }

  return (
    <div>
      {children}
      <Navigation path={props.location.pathname}></Navigation>
    </div>
  );
}

export default BaseLayout;
