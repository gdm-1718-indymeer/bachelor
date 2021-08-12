import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import {
  AddMedicine,
  Calender,
  Description,
  Home,
  Invite,
  Login,
  Profile,
  Register,
  Settings,
  SmartPill,
  Timer,
  Webcam,
  Welcome,
} from './pages';
import { Clients, Create, Medication } from './admin';

import {
  BaseLayout,
  DashboardLayout,
  SettingsLayout,
  AuthLayout,
} from './components/layout';

import * as Routes from './routes';
import './_sass/app.scss';
import { AppProvider } from './services/context.services';
import firebase from 'firebase';
import Invitation from './pages/invite/Invitation';

function App() {
  const [appState, setAppState] = useState({ loginStatus: 'PENDING' });
  /* useEffect => ComponentDidMount and ComponentUpdate but with the second argument ("[]") it's ComponentDidMount
     The empty array is important to not run this every update!
  */
  useEffect(() => {
    /* 
    onAuthStateChanged is a listener so this will detect changes while the app is running...
    If the user is logged out this will catch the error
    */
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        localStorage.setItem('firebase:currentUser', JSON.stringify(user));
        setAppState({ loginStatus: 'LOGGED_IN' });
      } else {
        localStorage.clear();
        setAppState({ loginStatus: 'LOGGED_OUT' });
      }
    });
  }, []);
  //make sure nothing happens while it is checking the user
  if (appState.loginStatus === 'PENDING') return <></>;
  return (
    <AppProvider value={{ ...appState, updateContext: setAppState }}>
      <Router>
        <Switch>
          <RouteWrapper path={Routes.HOME} layout={BaseLayout} component={Home} exact />
          <RouteWrapper path={Routes.WELCOME} layout={AuthLayout} component={Welcome} exact />
          <RouteWrapper path={Routes.ADD} layout={BaseLayout} component={AddMedicine} exact />
          <RouteWrapper path={Routes.LOGIN} layout={AuthLayout} component={Login} exact />
          <RouteWrapper path={Routes.REGISTER} layout={AuthLayout} component={Register} exact />
          <RouteWrapper path={Routes.NOW} layout={BaseLayout} component={Timer} exact />
          <RouteWrapper path={Routes.CAMERA} layout={BaseLayout} component={Webcam} exact />
          <RouteWrapper path={Routes.NEXT} layout={SettingsLayout} component={Description} exact />
          <RouteWrapper path={Routes.DESCRIPTION} layout={SettingsLayout} component={Description} exact />
          <RouteWrapper path={Routes.INVITATION} layout={SettingsLayout} component={Invitation} exact />
          {/* settings */}
          <RouteWrapper path={Routes.SETTINGS} layout={BaseLayout} component={Settings} exact />
          <RouteWrapper path={Routes.PROFILE} layout={SettingsLayout} component={Profile} exact />
          <RouteWrapper path={Routes.CALENDAR} layout={SettingsLayout} component={Calender} exact />
          <RouteWrapper path={Routes.PILLFILL} layout={SettingsLayout} component={SmartPill} exact />


          {/* Dahboard */}
          <RouteWrapper path={Routes.DASHBOARD} layout={DashboardLayout} component={Clients} exact />
          <RouteWrapper path={Routes.DASHMEDICATION} layout={DashboardLayout} component={Medication} exact />
          <RouteWrapper path={Routes.CREATEMED} layout={DashboardLayout} component={Create} exact />

          {/* Admin */}
          <RouteWrapper path={Routes.INVITE} layout={SettingsLayout} component={Invite} exact />
        </Switch>
      </Router>
    </AppProvider>
  );
}

function RouteWrapper({ component: Component, layout: Layout, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => (
        <Layout {...props}>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}

export default App;
