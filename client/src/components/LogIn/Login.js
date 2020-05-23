import React, { Component } from "react";
import slika from "../../images/slikk.png";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "../../utils.css";
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "" };
  }
  /*onTextChange = (e) => {
    const value = e.target.value;
    const { name } = e.target;
    this.setState({ [name]: value });
  };
  onSubmitChange = (e) => {
    e.preventDefault();

    const { email, password } = this.state;
    const objekt = { password };
    fetch(
      `/checkLogin/${email}`,
      {
        method: "post",
        mode: "cors", // no-cors, *cors, same-origin
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(objekt),
      } //)
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data === true) {
          this.props.changeLogged();
          this.props.getContacts();
          this.props.changeEmailOn(email);
        } else if (data === false) {
          alert("Wrong password");
        } else {
          alert("No registered");
        }
      });
  };*/
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
          <div className="container-login100 ozadjeUserIntercase">
            <div className="wrap-login100 ozadjeUserIntercase">
              <form
                onSubmit={this.props.onSubmitChange1}
                className="login100-form validate-form position"
              >
                <span className="login100-form-title p-b-43">
                  Login to continue
                </span>

                <div
                  className="wrap-input100 validate-input"
                  data-validate="Valid email is required: ex@abc.xyz"
                >
                  <input
                    onChange={this.props.onTextChange}
                    className="input100 teks123t"
                    type="text"
                    name="emailforLogin"
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
                    name="passwordforLogin"
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
                  <button className="login100-form-btn">Login</button>
                </div>

                <div className="text-center p-t-46 p-b-20">
                  <Link to="/register">
                    <span className="txt2 registerWord">
                      First time ? Register
                    </span>
                  </Link>
                </div>
              </form>

              <div className="login100-more"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
