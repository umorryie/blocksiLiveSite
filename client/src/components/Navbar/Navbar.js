import React, { Component } from "react";

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
                LOG IN
              </li>
            )}
            {logged ? (
              ""
            ) : (
              <li onClick={changeClickRegister} className="linavbar">
                REGISTER
              </li>
            )}
          </ul>
        </div>
      }
    </div>
  );
};

export default Navbar;
