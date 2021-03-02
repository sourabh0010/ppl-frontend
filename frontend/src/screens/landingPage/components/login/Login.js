import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Heading from "../../../../components/heading/Heading";
import FormInput from "../../../../components/forms/Form";
import action from "../../../../redux/action";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: "",
      check: false,
    };
  }
  //changing input field

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  //submiting data for login a user
  submit = (e) => {
    e.preventDefault();
    this.props.dispatch(action.logInUser(this.state));
  };

  render() {
    return (
      <div>
        <div className="content_rgt">
          <div className="login_sec">
            <div>
              <Heading content="Log In" size="36px" />
              <form onSubmit={this.submit}>
                <ul>
                  <li>
                    {" "}
                    <FormInput //form component
                      label="Email"
                      name="email"
                      type="email"
                      placeholder="Enter email"
                      onchange={this.handleChange}
                    />
                  </li>
                  <li>
                    {" "}
                    <FormInput //form component
                      label="Password"
                      name="password"
                      type="password"
                      placeholder="Enter Password"
                      onchange={this.handleChange}
                    />
                  </li>
                  <p style={{ color: "red" }}>{this.props.error}</p>
                  <li>
                    <input type="submit" defaultValue="Log In" />
                    <Link to="/forgot">Forgot Password</Link>
                  </li>
                </ul>
              </form>
              <div className="addtnal_acnt">
                I do not have any account yet.
                <a href>
                  <Link to="/signup">Create My Account Now !</Link>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    error: state.data.error,
  };
}
export default connect(mapStateToProps)(Login);
