import React, { Component } from "react";

const Navbar = () => {
  return (
    <div className="navbar">
      {
        <div className="navbarcontainer">
          {" "}
          <ul className="ulnavbar">
            <li className="linavbar">LOG IN</li>
            <li className="linavbar">REGISTER</li>
          </ul>
        </div>
      }
    </div>
  );
};

export default Navbar;
