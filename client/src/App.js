import React, { Component } from "react";
import logo from "./logo.svg";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import Mainwindow from "./components/MainWindows/Mainwindow";
import Contact from "./components/Contact/Contact";
import Register from "./components/Register/Register";
import Login from "./components/LogIn/Login";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { logged: false, email: "", contacts: [] };
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
    this.getContacts();
  }
  render() {
    return (
      <Router>
        <div className="App">
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
        </div>
      </Router>
    );
  }
}
