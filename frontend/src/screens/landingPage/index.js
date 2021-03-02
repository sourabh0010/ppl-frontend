import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "./components/login/Login";
import SignUp from "./components/signup/Signup";
import ContentLeft from "./components/HomeImage";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import ForgotPassword from "./components/forgotPassword/ForgotPassword";
function Index() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <div className="content">
          <Route
            exact
            path={["/signup", "/", "/forgot"]}
            component={ContentLeft}
          />
          <Switch>
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/" component={Login} />
            <Route path="/forgot" component={ForgotPassword}></Route>
          </Switch>
        </div>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default Index;
