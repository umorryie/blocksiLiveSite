import React, { Component } from "react";
import Contact from "../Contact/Contact";
export default class Mainwindow extends Component {
  constructor(props) {
    super(props);
    this.state = { contacts: [] };
  }
  componentDidMount() {
    //this.props.getContacts().then(console.log);
    console.log(this.props.contacts);
  }
  render() {
    let contacts = <Contact email={this.props.email} />;
    return (
      <div className="mainwindow">
        <div className="container">
          <div
            className="odjava"
            onClick={() => {
              this.props.changeLogged();
              this.props.deleteEmail();
            }}
          >
            ODJAVA
          </div>
          <div className="contacts">{contacts}</div>
        </div>
      </div>
    );
  }
}
