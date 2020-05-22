import React, { Component } from "react";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "", email: "", password: "" };
  }
  onTextChange = (e) => {
    const value = e.target.value;
    const { name } = e.target;
    this.setState({ [name]: value });
  };
  onSubmitChange = (e) => {
    e.preventDefault();
    const { name, email, password } = this.state;
    const object = { name, email, password };
    fetch(
      "/users",
      {
        method: "POST",
        mode: "cors", // no-cors, *cors, same-origin
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(object),
      } //
    )
      .then((res) => res.json())
      .then((data) => {
        this.props.getContacts();
        this.props.changeEmailOn(email);
        this.props.changeLogged();
      });
  };
  render() {
    return (
      <div>
        {
          <form onSubmit={this.onSubmitChange}>
            <label>
              Name:
              <input onChange={this.onTextChange} type="text" name="name" />
            </label>
            <label>
              Email:
              <input onChange={this.onTextChange} type="text" name="email" />
            </label>
            <label>
              Password:
              <input
                onChange={this.onTextChange}
                type="password"
                name="password"
              />
            </label>
            <input type="submit" value="Submit" />
          </form>
        }
      </div>
    );
  }
}
