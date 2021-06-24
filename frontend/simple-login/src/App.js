import React from 'react';
import {BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import Layout from './pages/Layout';
import Register from './pages/Register';
import withAuth from './withAuth';

const App = () => (
  <div>
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
        <Route path="/forgotpassword" component={ForgotPassword}/>
        <Route path="/reset/:resetPasswordToken" component={ResetPassword}/>
        <Route path="/" component={withAuth(Layout)}/>
      </Switch>
    </BrowserRouter>
  </div>
)

export default App;