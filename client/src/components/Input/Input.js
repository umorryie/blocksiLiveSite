import React, { Component } from "react";

export default class Input extends Component {
  render() {
    return (
      <div>
        {
          <form onSubmit={this.onSubmitChange}>
            <label>
              Name:
              <input type="text" name="name" />
            </label>
            <label>
              Surrname:
              <input type="text" name="surrname" />
            </label>
            <label>
              Address:
              <input type="text" name="address" />
            </label>
            <label>
              PhoneNumber:
              <input type="text" name="phoneNumber" />
            </label>
            <input type="submit" value="Submit" />
          </form>
        }
      </div>
    );
  }
}
