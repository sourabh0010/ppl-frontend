import React, { useState } from "react";
import { Link } from "react-router-dom";

import FormInput from "../../../../components/forms/Form";
import Url from "../../../../util/Config";

import "./forgotPassword.css";
import axios from "axios";
function ForgotPassword(props) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const obj = {
      email: email,
      port: window.location.origin,
    };
    axios.post(`${Url.baseurl}/auth/forgotPassword`, obj).then((resp) => {
      if (!resp.data[0]) {
        setError("Email not found. Please enter valid email");
      } else {
        setError("Email send succesfully");
      }
      console.log(resp);
    });
  };
  const handleChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };
  return (
    <div className="content_rgt">
      <div className="login_sec">
        <form onSubmit={handleSubmit}>
          <FormInput
            label="Enter your Email"
            type="email"
            placeholder="Enter your email"
            onchange={handleChange}
            name="email"
          />
          <p style={{ color: "red" }}>{error}</p>
          <FormInput id="button" type="submit" />
          <br />
          <button id="button">
            <Link style={{color:"white"}}to="/">Back to login</Link>
          </button>
        </form>
        <br />
      </div>
    </div>
  );
}

export default ForgotPassword;
