import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import "./App.css";
import LandingPage from "./screens/landingPage";
import ScrollToTop from "./components/ScrollToTop";
import Timeline from "./screens/timeline/Timeline";
import ForgotPassword from "./screens/ResetPassword";
import Navbar from "./screens/components/navbar/Navbar";
import Footer from "./screens/components/footer/Footer";
import SinglePost from "./screens/timeline/singlepost";

function App(props) {
  const [loggedin, setLoggedIn] = useState();
  const { data } = props;
  useEffect(() => {
    console.log("efwsdnmxc ")
    if (data._id) {
      localStorage.setItem("id", data._id);
      localStorage.setItem("username", data.username);
    }

    if (localStorage.getItem("id")) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [data]);

  return (
    <BrowserRouter>
      <ScrollToTop>
        <Switch>
          <Route exact path="/reset/:token" component={ForgotPassword} />
          {loggedin ? (
            <>
              <Navbar />
              <Switch>
                <Route exact path="/" component={Timeline} />
                <Route exact path="/:id" component={SinglePost} />
              </Switch>
              <Footer />
            </>
          ) : (
            <Route exact path={["/login", "/forgot", "/"]}>
              <LandingPage />
            </Route>
          )}
        </Switch>
      </ScrollToTop>
    </BrowserRouter>
  );
}
function mapStateToProps(state) {
  console.log(state)
  return {
    data: state.data,
  };
}
export default connect(mapStateToProps)(App);
