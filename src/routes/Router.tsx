import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {
  ForgotPassword,
  Home,
  Profile,
  Modules,
  SignIn,
  SignUp,
  Notifications,
  Module,
  Lesson,
} from '../pages';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/forgot-password" component={ForgotPassword} />

        <Route path="/home" component={Home} />
        <Route path="/profile" component={Profile} />
        <Route path="/favorites" component={Home} />
        <Route path="/notifications" component={Notifications} />
        <Route path="/modules" component={Modules} />
        <Route path="/chat" component={Home} />
        <Route path={['/module', '/module/:id']} component={Module} />
        <Route path={['/lesson', '/lesson/:id']} component={Lesson} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
