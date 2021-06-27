
import React from 'react'
import { BrowserRouter as Router, Switch, Redirect, Route } from 'react-router-dom'

import { Home } from './pages'
import { BaseLayout, LoginLayout } from './components/layout'

import * as Routes from './routes' 
import logo from './logo.svg';
import './_sass/app.scss';

function App() {
  return (
    <Router>
    <Switch>
      <RouteWrapper path={Routes.HOME} layout={BaseLayout} component={Home} exact />
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
