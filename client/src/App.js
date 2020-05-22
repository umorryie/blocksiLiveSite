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
      logged: true,
      email: "test@test.test",
      contacts: [],
      button: false,
      name: "",
      surrname: "",
      address: "",
      phoneNumber: "",
    };
  }
  changeLogged = () => {
    this.setState({ logged: !this.state.logged });
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
          console.log(data);
          this.setState({ contacts: data });
          console.log(this.state);
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
        console.log(data.contacts);
        data.contacts.forEach((el) => (lol += el.name));
        console.log(lol);
        this.setState({ contacts: data.contacts });
      });
  };
  changeButton = () => {
    this.setState({ button: !this.state.button });
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
    this.refresh();
  };

  render() {
    let contactss = this.state.contacts.map((el, i) => (
      <Contact
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
        <Navbar />
        <div className="appcontainer1">
          {this.state.logged ? (
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
          )}
          {this.state.button ? (
            <div>
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
          <div className="appcontainer">{contactss}</div>
        </div>
      </Router>
    );
  }
}

{
  /*<div className="App">
{this.state.logged ? (
  <Mainwindow
    contacts={this.state.contacts}
    getContacts={this.getContacts}
    email={this.state.email}
    deleteEmail={this.deleteEmail}
    changeEmailOn={this.changeEmailOn}
    changeLogged={this.changeLogged}
    logged={this.state.logged}
  />
) : (
  <Switch>
    <Route path="/login" exact>
      <Login
        contacts={this.state.contacts}
        getContacts={this.getContacts}
        email={this.state.email}
        deleteEmail={this.deleteEmail}
        changeEmailOn={this.changeEmailOn}
        changeLogged={this.changeLogged}
        logged={this.state.logged}
      />
    </Route>
    <Route path="/" exact>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </Route>
    <Route path="/register" exact>
      <Register
        contacts={this.state.contacts}
        getContacts={this.getContacts}
        email={this.state.email}
        deleteEmail={this.deleteEmail}
        changeEmailOn={this.changeEmailOn}
        changeLogged={this.changeLogged}
        logged={this.state.logged}
      />
    </Route>
    <Route path="/mainwindow">
      <Mainwindow />
    </Route>
  </Switch>
)}
</div>}
*/
}
