import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoffee,
  faCircle,
  faPlusCircle,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";
library.add(faEnvelope, faKey, faCircle, faPlusCircle, faTrash, faSync);
export default class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = { email: this.props.email };
  }
  componentDidMount() {
    {
      /*fetch(`/users`)
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
    .then((el) => console.log("el[0]), this.state.email"));*/
    }
  }
  render() {
    return (
      <div>
        <div className="contactContainer">
          <div className="tekst">
            {" "}
            <div className="cname">
              <div className="inline">
                <h3>Name:</h3> <div>{this.props.name}</div>
                <FontAwesomeIcon
                  onClick={() => this.props.window("name", this.props.name)}
                  className="plusCircle1"
                  size="1x"
                  color="green"
                  icon="sync"
                />
              </div>
            </div>
            <div className="csurrname">
              <div className="inline">
                {" "}
                <h3>Surrname:</h3> <div>{this.props.surrname}</div>
                <FontAwesomeIcon
                  onClick={() =>
                    this.props.window("surrname", this.props.surrname)
                  }
                  className="plusCircle1"
                  size="1x"
                  color="green"
                  icon="sync"
                />
              </div>
            </div>
            <div className="caddress">
              <div className="inline">
                <h3>Address:</h3>
                <div> {this.props.address}</div>
                <FontAwesomeIcon
                  onClick={() =>
                    this.props.window("address", this.props.address)
                  }
                  className="plusCircle1"
                  size="1x"
                  color="green"
                  icon="sync"
                />
              </div>
            </div>
            <div className="cphoneNumber">
              <div className="inline">
                {" "}
                <h3>Phonenumber:</h3>
                <div> {this.props.phoneNumber}</div>
                <FontAwesomeIcon
                  onClick={() =>
                    this.props.window("phoneNumber", this.props.phoneNumber)
                  }
                  className="plusCircle1"
                  size="1x"
                  color="green"
                  icon="sync"
                />
              </div>
            </div>
          </div>
          <div className="gumba">
            <div></div>
            <div>
              <FontAwesomeIcon
                className="plusCircle"
                size="2x"
                color="red"
                icon="trash"
                onClick={() => {
                  this.props.deleteFromContacts(this.props.surrname);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
