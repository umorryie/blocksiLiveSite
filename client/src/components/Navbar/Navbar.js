import React, { Component } from "react";
import Login from "../LogIn/Login";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
const Navbar = ({
  spremeni,
  changeclickLog,
  changeClickRegister,
  logged,
  refresh,
  deleteEmail,
  changeLogged,
  emptyContacts,
}) => {
  return (
    <div className="navbar">
      {
        <div className="navbarcontainer">
          {" "}
          <ul className="ulnavbar">
            {logged ? (
              <li
                onClick={() => {
                  deleteEmail();
                  refresh();
                  refresh();
                  changeclickLog();
                  emptyContacts();
                  spremeni();
                  changeLogged();
                }}
                className="linavbar"
              >
                LOG OUT
              </li>
            ) : (
              <li onClick={changeclickLog} className="linavbar">
                <Link className="linky" to="/login">
                  LOG IN
                </Link>
              </li>
            )}
            {logged ? (
              ""
            ) : (
              <li onClick={changeClickRegister} className="linavbar">
                <Link className="linky" to="/register">
                  REGISTER
                </Link>
              </li>
            )}
          </ul>
        </div>
      }
    </div>
  );
};

export default Navbar;
