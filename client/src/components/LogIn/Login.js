import React, { Component } from "react";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "" };
  }
  onTextChange = (e) => {
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
  };
  render() {
    return (
      <div>
        {
          <form onSubmit={this.onSubmitChange}>
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
