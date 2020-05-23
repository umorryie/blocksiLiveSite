import React, { Component } from "react";

import slika from "../../images/slikk.png";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "", email: "", password: "" };
  }

  render() {
    return (
      <div className="backgroundss ozadjeUserIntercase">
        <div
          className="limiter"
          style={{
            backgroundImage: `url(${slika})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            overflow: "hidden",
          }}
        >
          <div className="container-login100">
            <div className="wrap-login100 ozadjeUserIntercase">
              <form
                onSubmit={this.props.onSubmitChange2}
                className="login100-form validate-form position"
              >
                <span className="login100-form-title p-b-43">
                  Register to continue
                </span>
                <div
                  className="wrap-input100 validate-input"
                  data-validate="Valid email is required: ex@abc.xyz"
                >
                  <input
                    onChange={this.props.onTextChange}
                    className="input100 teks123t"
                    type="text"
                    name="registername"
                  />
                  <span className="focus-input100"></span>
                  <span className="label-input100">Name</span>
                </div>
                <div
                  className="wrap-input100 validate-input"
                  data-validate="Valid email is required: ex@abc.xyz"
                >
                  <input
                    onChange={this.props.onTextChange}
                    className="input100 teks123t"
                    type="text"
                    name="registeremail"
                  />
                  <span className="focus-input100"></span>
                  <span className="label-input100">Email</span>
                </div>

                <div
                  className="wrap-input100 validate-input"
                  data-validate="Password is required"
                >
                  <input
                    onChange={this.props.onTextChange}
                    className="input100 teks123t"
                    type="password"
                    name="registerpassword"
                  />
                  <span className="focus-input100"></span>
                  <span className="label-input100">Password</span>
                </div>

                <div className="flex-sb-m w-full p-t-3 p-b-32">
                  <div className="contact100-form-checkbox">
                    <input
                      className="input-checkbox100"
                      id="ckb1"
                      type="checkbox"
                      name="remember-me"
                    />
                    <label className="label-checkbox100" htmlFor="ckb1">
                      Remember me
                    </label>
                  </div>
                </div>

                <div className="container-login100-form-btn">
                  <button className="login100-form-btn">Register</button>
                </div>

                <div className="text-center p-t-46 p-b-20">
                  <Link to="/login">
                    <span className="txt2 registerWord">
                      Already registered ? Login
                    </span>
                  </Link>
                </div>
              </form>

              <div
                className="login100-more"
                style={{ backgroundImage: `url(${slika})` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
