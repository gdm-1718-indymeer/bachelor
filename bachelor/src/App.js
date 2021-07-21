
import React from 'react'
import { BrowserRouter as Router, Switch, Redirect, Route } from 'react-router-dom'

import { AddMedicine, Home, Login, Settings, Welcome} from './pages'
import { BaseLayout } from './components/layout'

import * as Routes from './routes' 
import logo from './logo.svg';
import './_sass/app.scss';

function App() {
  return (
    <Router>
    <Switch>
      <RouteWrapper path={Routes.HOME} layout={BaseLayout} component={Home} exact />
      <RouteWrapper path={Routes.WELCOME} layout={BaseLayout} component={Welcome} exact />
      <RouteWrapper path={Routes.ADD} layout={BaseLayout} component={AddMedicine} exact />
      <RouteWrapper path={Routes.SETTINGS} layout={BaseLayout} component={Settings} exact />
      <RouteWrapper path={Routes.LOGIN} layout={BaseLayout} component={Login} exact />




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
