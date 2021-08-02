
import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { AddMedicine, Calender, Home, Login, Profile, Settings, Timer, Welcome} from './pages'
import { Clients } from './admin'

import { BaseLayout, DashboardLayout, SettingsLayout } from './components/layout'

import * as Routes from './routes' 
import './_sass/app.scss';

function App() {
  return (
    <Router>
    <Switch>
      <RouteWrapper path={Routes.HOME} layout={BaseLayout} component={Home} exact />
      <RouteWrapper path={Routes.WELCOME} layout={BaseLayout} component={Welcome} exact />
      <RouteWrapper path={Routes.ADD} layout={BaseLayout} component={AddMedicine} exact />
      <RouteWrapper path={Routes.LOGIN} layout={BaseLayout} component={Login} exact />
      <RouteWrapper path={Routes.NOW} layout={BaseLayout} component={Timer} exact />

      <RouteWrapper path={Routes.SETTINGS} layout={BaseLayout} component={Settings} exact />
      <RouteWrapper path={Routes.PROFILE} layout={SettingsLayout} component={Profile} exact />
      <RouteWrapper path={Routes.CALENDAR} layout={SettingsLayout} component={Calender} exact />




      <RouteWrapper path={Routes.DASHBOARD} layout={DashboardLayout} component={Clients} exact />


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
