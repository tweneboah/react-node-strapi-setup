import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import LoginForm from "./components/Forms/LoginForm";
import RegistrationForm from "./components/Forms/RegistrationForm";
const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/register" component={RegistrationForm} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
