import React, { Component } from "react";
import logo from "./logo.svg";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Input from "./components/Input/Input";
import {
  faCoffee,
  faCircle,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";
import Mainwindow from "./components/MainWindows/Mainwindow";
import Contact from "./components/Contact/Contact";
import Register from "./components/Register/Register";
import Login from "./components/LogIn/Login";
import Navbar from "./components/Navbar/Navbar";
library.add(faEnvelope, faKey, faCircle, faPlusCircle);
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clickLog: false,
      logged: false,
      email: "",
      contacts: [],
      button: false,
      name: "",
      surrname: "",
      address: "",
      phoneNumber: "",
      passwordforLogin: "",
      emailforLogin: "",
      clickRegister: false,
      registername: "",
      registerpassword: "",
      registeremail: "",
    };
  }
  spremeni = () => {
    this.setState({
      clickLog: false,
      logged: false,
      email: "",
      contacts: [],
      button: false,
      name: "",
      surrname: "",
      address: "",
      phoneNumber: "",
      passwordforLogin: "",
      emailforLogin: "",
      clickRegister: false,
      registername: "",
      registerpassword: "",
      registeremail: "",
    });
  };
  changeClickRegister = () => {
    this.setState({ clickRegister: !this.state.clickRegister });
  };
  changeLogged = () => {
    this.setState({ logged: !this.state.logged });
    this.refresh();
    this.refresh();
  };
  changeEmailOn = (email) => {
    this.setState({ email });
  };
  deleteEmail = () => {
    this.setState({ email: "" });
  };
  getContacts = () => {
    if (this.state.email !== "") {
      fetch(`/users/${this.state.email}`)
        .then((re) => re.json())
        .then((data) => {
          this.setState({ contacts: data });
        });
    }
  };
  componentDidMount() {
    //this.getContacts();
  }
  deleteFromContacts = (surrname) => {
    fetch(`/users/surrname/${this.state.email}`, {
      method: "delete",
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ surrname: surrname }),
    })
      .then((res) => res.json())
      .then((el) => this.refresh()); //)
  };
  componentWillMount() {
    if (this.state.email !== "") {
      this.refresh();
    }
  }
  refresh = () => {
    fetch(`/users/${this.state.email}`)
      .then((res) => res.json())
      .then((data) => {
        let lol = "";
        data.contacts.forEach((el) => (lol += el.name));
        this.setState({ contacts: data.contacts });
      });
  };
  changeButton = () => {
    this.setState({ button: !this.state.button });
  };
  onSubmitChange2 = (e) => {
    e.preventDefault();
    const { registername, registeremail, registerpassword } = this.state;
    const object = {
      name: registername,
      email: registeremail,
      password: registerpassword,
    };
    fetch("/users", {
      method: "POST",
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(object),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data === "good") {
          this.changeEmailOn(registeremail);
          this.changeLogged();
          this.changeClickRegister();
        } else {
          alert("Something went wrong. Register declined");
        }
      })
      .catch((er) => console.log(er));
  };
  onTextChange = (e) => {
    const value = e.target.value;
    const { name } = e.target;
    this.setState({ [name]: value });
  };
  onSubmitChange = (e) => {
    e.preventDefault();
    const { name, address, phoneNumber, surrname } = this.state;
    const object = { name, address, phoneNumber, surrname };
    fetch(`/users/contacts/${this.state.email}`, {
      method: "post",
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(object),
    });
    this.changeButton();
    this.refresh();
    this.setState({ name: "", address: "", phoneNumber: "", surrname: "" });
    this.refresh();
  };

  onSubmitChange1 = (e) => {
    e.preventDefault();

    const { passwordforLogin, emailforLogin } = this.state;
    const object = { password: passwordforLogin };
    fetch(`/checkLoginRegular/${emailforLogin}`, {
      method: "post",
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(object),
    })
      .then((re) => re.json())
      .then((data) => {
        if (data === true) {
          this.changeEmailOn(emailforLogin);
          this.changeLogged();
        } else if (data === false) {
          alert("Wrong password");
        } else {
          alert("Not registered yet");
        }
      });
    //this.changeButton();
    //this.refresh();
    //this.setState({ name: "", address: "", phoneNumber: "", surrname: "" });
    // this.refresh();
  };
  emptyContacts = () => {
    this.setState({ contacts: [] });
  };
  changeclickLog = () => {
    this.setState({ clickLog: !this.state.clickLog });
  };
  window = (prop, newword) => {
    const tekst = prompt(`Enter new ${prop}: `);
    const objekt = { name: newword, newName: tekst };
    fetch(`/users/${prop}/${this.state.email}`, {
      method: "put",
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(objekt),
    });
    this.refresh();
    this.refresh();
  };

  render() {
    let contactss = this.state.contacts.map((el, i) => (
      <Contact
        window={this.window}
        deleteFromContacts={this.deleteFromContacts}
        key={i}
        name={el.name}
        address={el.address}
        surrname={el.surrname}
        phoneNumber={el.phoneNumber}
      />
    ));
    return (
      <Router>
        <Navbar
          spremeni={this.spremeni}
          changeClickRegister={this.changeClickRegister}
          refresh={this.refresh}
          emptyContacts={this.emptyContacts}
          deleteEmail={this.deleteEmail}
          logged={this.state.logged}
          changeLogged={this.changeLogged}
          changeclickLog={this.changeclickLog}
        />
        <div className="koseloginamo">
          {this.state.clickLog && !this.state.logged ? (
            <div>
              {
                <form onSubmit={this.onSubmitChange1}>
                  <label>
                    Email:
                    <input
                      onChange={this.onTextChange}
                      type="text"
                      name="emailforLogin"
                    />
                  </label>
                  <label>
                    Password:
                    <input
                      onChange={this.onTextChange}
                      type="password"
                      name="passwordforLogin"
                    />
                  </label>
                  <input type="submit" value="Submit" />
                </form>
              }
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="appcontainer1">
          {this.state.logged && !this.state.button ? (
            <div>
              <FontAwesomeIcon
                onClick={this.changeButton}
                className="plusCircle"
                size="3x"
                color="green"
                icon="plus-circle"
              />
            </div>
          ) : (
            ""
          )}{" "}
          {this.state.clickRegister ? (
            <div>
              {
                <form onSubmit={this.onSubmitChange2}>
                  <label>
                    Name:
                    <input
                      onChange={this.onTextChange}
                      type="text"
                      name="registername"
                    />
                  </label>
                  <label>
                    Email:
                    <input
                      onChange={this.onTextChange}
                      type="text"
                      name="registeremail"
                    />
                  </label>
                  <label>
                    Password:
                    <input
                      onChange={this.onTextChange}
                      type="password"
                      name="registerpassword"
                    />
                  </label>
                  <input type="submit" value="Submit" />
                </form>
              }
            </div>
          ) : (
            ""
          )}
          {this.state.button ? (
            <div className="form">
              {
                <form onSubmit={this.onSubmitChange}>
                  <label>
                    Name:
                    <input
                      onChange={this.onTextChange}
                      type="text"
                      name="name"
                    />
                  </label>
                  <label>
                    Surrname:
                    <input
                      onChange={this.onTextChange}
                      type="text"
                      name="surrname"
                    />
                  </label>
                  <label>
                    Address:
                    <input
                      onChange={this.onTextChange}
                      type="text"
                      name="address"
                    />
                  </label>
                  <label>
                    PhoneNumber:
                    <input
                      onChange={this.onTextChange}
                      type="text"
                      name="phoneNumber"
                    />
                  </label>
                  <input type="submit" value="Submit" />
                </form>
              }
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="appcontainer1">
          <div className="appcontainer">
            {this.state.logged ? contactss : ""}
          </div>
        </div>
      </Router>
    );
  }
}
