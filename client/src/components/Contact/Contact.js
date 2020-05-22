import React, { Component } from "react";

export default class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = { email: this.props.email };
  }
  componentDidMount() {
    fetch(`/users`)
      .then((re) => re.json())
      .then((data) => {
        let novi = [];
        novi = [...novi, data];
        console.log(novi);
        if (data.length > 0) {
          return data.filter((el) => el.email === this.props.email);
        } else if (data.length === 0) {
          return ["Empty database"];
        } else {
          return novi;
        }
      })
      .then((el) => console.log("el[0]), this.state.email"));
  }
  render() {
    return <div>Contact</div>;
  }
}
