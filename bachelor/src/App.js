
import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { AddMedicine, Calender, Description, Home, Invite, Login, Profile, Settings, Timer, Webcam, Welcome } from './pages'
import { Clients, Create, Medication } from './admin'

import { BaseLayout, DashboardLayout, SettingsLayout } from './components/layout'

import * as Routes from './routes'
import './_sass/app.scss';

function App() {
  return (
    <Router>
      <Switch>
        <RouteWrapper path={Routes.HOME} layout={BaseLayout} component={Home} exact />
        <RouteWrapper path={Routes.WELCOME} layout={SettingsLayout} component={Welcome} exact />
        <RouteWrapper path={Routes.ADD} layout={BaseLayout} component={AddMedicine} exact />
        <RouteWrapper path={Routes.LOGIN} layout={SettingsLayout} component={Login} exact />
        <RouteWrapper path={Routes.NOW} layout={BaseLayout} component={Timer} exact />
        <RouteWrapper path={Routes.CAMERA} layout={BaseLayout} component={Webcam} exact />
        <RouteWrapper path={Routes.NEXT} layout={SettingsLayout} component={Description} exact />
        <RouteWrapper path={Routes.DESCRIPTION} layout={SettingsLayout} component={Description} exact />


        {/* settings */}
        <RouteWrapper path={Routes.SETTINGS} layout={BaseLayout} component={Settings} exact />
        <RouteWrapper path={Routes.PROFILE} layout={SettingsLayout} component={Profile} exact />
        <RouteWrapper path={Routes.CALENDAR} layout={SettingsLayout} component={Calender} exact />


        {/* Dahboard */}
        <RouteWrapper path={Routes.DASHBOARD} layout={DashboardLayout} component={Clients} exact />
        <RouteWrapper path={Routes.DASHMEDICATION} layout={DashboardLayout} component={Medication} exact />
        <RouteWrapper path={Routes.CREATEMED} layout={DashboardLayout} component={Create} exact />


        {/* Admin */}
        <RouteWrapper path={Routes.INVITE} layout={SettingsLayout} component={Invite} exact />



      </Switch>
    </Router>
  );
}

function RouteWrapper({
  component: Component,
  layout: Layout,
  ...rest
}) {
  return (
    <Route {...rest} render={(props) =>
      <Layout {...props}>
        <Component {...props} />
      </Layout>
    } />
  )
}

export default App;
