import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from '../view/login/login';
import Register from '../view/register/register';
import Layout from '../view/layout/layout'

const BasicRoute = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login}/>
      <Route exact path="/register" component={Register}/>
      <Route component={Layout}/>
    </Switch>
  </BrowserRouter>
);

export default BasicRoute;
