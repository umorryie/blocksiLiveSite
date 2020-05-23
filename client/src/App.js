import React, { Component } from "react";
import logo from "./logo.svg";
import ozadje from "./images/ozadje.jpg";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import Table from "./components/Table/Table";
//import { browserHistory } from "react-router";
import { withRouter } from "react-router";
import { Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Input from "./components/Input/Input";
import {
  faCoffee,
  faCircle,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { createBrowserHistory } from "history";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";
import Mainwindow from "./components/MainWindows/Mainwindow";
import Contact from "./components/Contact/Contact";
import Register from "./components/Register/Register";
import Login from "./components/LogIn/Login";
import Navbar from "./components/Navbar/Navbar";
library.add(faEnvelope, faKey, faCircle, faPlusCircle);
const history = createBrowserHistory();
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
      sort: "",
      surrnamefilta: "",
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
      surrnamefilta: "",
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
  deleteFromContacts = (surrname, name) => {
    fetch(`/users/surrname/${this.state.email}`, {
      method: "delete",
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ surrname, name }),
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
    const ary = [name, address, phoneNumber, surrname];
    const validateor = ary.filter((el) => el !== "");
    if (validateor.length === 4) {
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
    } else {
      alert("Not all fields are filled!");
    }
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
    }) /*
    const { passwordforLogin, emailforLogin } = this.state;
    const object = { password: passwordforLogin, email: emailforLogin };
    fetch(`/login`, {
      method: "post",
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(object),
    })*/
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
    if (this.state.surrnamefilta === "") {
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
    }
    const aray = this.state.contacts.filter((el) => {
      const beseda = el.surrname.toLowerCase();
      if (this.state.surrnamefilta === "") {
        return el;
      } else {
        const word = this.state.surrnamefilta.toLowerCase();
        return beseda.includes(word);
      }
    });
    const table = aray.map((el, i) => (
      <Table
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
      <Router history={history}>
        <Switch>
          <Route path="/" exact>
            <div className="mainBody ozadjeUserIntercase">
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

              <div className="appcontainer1">
                {this.state.logged && !this.state.button ? (
                  <div>
                    <div className="sredina">
                      <button className="add-btn" onClick={this.changeButton}>
                        ADD CONTACT
                      </button>
                    </div>
                    <div className="surrnameFilter">
                      <input
                        onChange={this.onTextChange}
                        className="surrnamefilta"
                        type="text"
                        placeholder="Search by surrname"
                        name="surrnamefilta"
                      />
                    </div>
                  </div>
                ) : (
                  ""
                )}{" "}
                {this.state.button ? (
                  <Input
                    onSubmitChange={this.onSubmitChange}
                    onTextChange={this.onTextChange}
                  />
                ) : (
                  ""
                )}
              </div>
              <div className="appcontainer1">
                <div className="appcontainer">
                  {this.state.logged ? (
                    <div>
                      <div className="contactTable">
                        <table id="contacts-table">
                          <thead>
                            <tr id="contacts-head">
                              <th className="th naslovnice">NAME</th>
                              <th className="th naslovnice">SURNAME</th>
                              <th className="th naslovnice">ADDRESS</th>
                              <th className="th naslovnice">PHONE NUMBER</th>
                              <th className="th naslovnice"></th>
                            </tr>
                          </thead>
                          <tbody>{table}</tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </Route>

          <Route
            exact
            path="/login"
            render={() =>
              this.state.logged ? (
                <Redirect to="/" />
              ) : (
                <Login
                  onSubmitChange1={this.onSubmitChange1}
                  onTextChange={this.onTextChange}
                />
              )
            }
          />
          <Route
            exact
            path="/register"
            render={() =>
              this.state.logged ? (
                <Redirect to="/" />
              ) : (
                <Register
                  onSubmitChange2={this.onSubmitChange2}
                  onTextChange={this.onTextChange}
                />
              )
            }
          />
        </Switch>
      </Router>
    );
  }
}
