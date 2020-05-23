import React, { Component } from "react";
import "./input.css";
export default class Input extends Component {
  render() {
    return (
      <div className="form23">
        <form onSubmit={this.props.onSubmitChange} className="">
          <div
            className="wrap-input100 validate-input inputclassss"
            data-validate="Valid email is required: ex@abc.xyz"
          >
            <input
              onChange={this.props.onTextChange}
              className="input100 teks123t inputclassssI"
              type="text"
              name="name"
            />
            <span className="focus-input100"></span>
            <span className="label-input100">Name</span>
          </div>

          <div
            className="wrap-input100 validate-input inputclassss"
            data-validate="Password is required"
          >
            <input
              onChange={this.props.onTextChange}
              className="input100 teks123t inputclassssI"
              type="text"
              name="surrname"
            />
            <span className="focus-input100"></span>
            <span className="label-input100">Surrname</span>
          </div>
          <div
            className="wrap-input100 validate-input inputclassss"
            data-validate="Valid email is required: ex@abc.xyz"
          >
            <input
              onChange={this.props.onTextChange}
              className="input100 teks123t inputclassssI"
              type="text"
              name="address"
            />
            <span className="focus-input100"></span>
            <span className="label-input100">Address</span>
          </div>
          <div
            className="wrap-input100 validate-input inputclassss"
            data-validate="Valid email is required: ex@abc.xyz"
          >
            <input
              onChange={this.props.onTextChange}
              className="input100 teks123t inputclassssI"
              type="text"
              name="phoneNumber"
            />
            <span className="focus-input100"></span>
            <span className="label-input100">PhoneNumber</span>
          </div>
          <div className="container-login100-form-btn">
            <button className="login100-form-btn">ADD</button>
          </div>
        </form>
      </div>
    );
  }
}
