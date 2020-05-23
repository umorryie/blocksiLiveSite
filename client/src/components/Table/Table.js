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
export default class Table extends Component {
  render() {
    return (
      <tr id="contacts-head heeeead">
        <th className="th2">
          {this.props.name}
          <FontAwesomeIcon
            onClick={() =>
              this.props.window(
                "name",
                this.props.name,
                this.props.surrname,
                this.props.address,
                this.props.phoneNumber
              )
            }
            className="plusCircle1"
            size="1x"
            color="green"
            icon="sync"
          />
        </th>
        <th className="th2">
          {this.props.surrname}
          <FontAwesomeIcon
            onClick={() =>
              this.props.window(
                "surrname",
                this.props.name,
                this.props.surrname,
                this.props.address,
                this.props.phoneNumber
              )
            }
            className="plusCircle1"
            size="1x"
            color="green"
            icon="sync"
          />
        </th>
        <th className="th2">
          {this.props.address}
          <FontAwesomeIcon
            onClick={() =>
              this.props.window(
                "address",
                this.props.name,
                this.props.surrname,
                this.props.address,
                this.props.phoneNumber
              )
            }
            className="plusCircle1"
            size="1x"
            color="green"
            icon="sync"
          />
        </th>
        <th className="th2">
          {this.props.phoneNumber}
          <FontAwesomeIcon
            onClick={() =>
              this.props.window(
                "phoneNumber",
                this.props.name,
                this.props.surrname,
                this.props.address,
                this.props.phoneNumber
              )
            }
            className="plusCircle1"
            size="1x"
            color="green"
            icon="sync"
          />
        </th>
        <th className="th2">
          <FontAwesomeIcon
            className="plusCircle"
            size="2x"
            color="red"
            icon="trash"
            onClick={() => {
              var answer = window.confirm(
                "Are you sure you want to delete this contact?"
              );
              if (answer) {
                this.props.deleteFromContacts(
                  this.props.surrname,
                  this.props.name
                );
              }
            }}
          />
        </th>
      </tr>
    );
  }
}
