import React, { useState } from "react";
import axios from "axios";
import "./resetPassword.css";
import Url from "../../util/Config"
function ForgotPassword(props) {
  const [password, setPassword] = useState("");

  const id = props.match.params.token; //post id from url 
  console.log(id)
 
   const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${Url.baseurl}/auth/reset`,{"token":id,"newPass":password}).then((res)=>{
alert(res.data)  ;
console.log(props)
props.location.pathname='/login'

  })
};
  const handleChange = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };
  return (
      <div >   
    <form  className="form" onSubmit={handleSubmit}>
      <h2>Reset Password</h2>
      <label for="password">Password</label>
      <input className="input" type="password" placeholder="Enter your new password" onChange={handleChange} name="password" required />
      <input className="input" type="submit" />
    </form>
    </div>

  );
}

export default ForgotPassword;
