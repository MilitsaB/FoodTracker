/** @format */

import React, { Component } from "react";
import axios from "axios";

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username,
    };

    console.log(user);

    axios
      .post("http://localhost:5000/users/add", user)
      .then((res) => console.log(res.data));

    this.setState({
      username: "",
    });
  }

  render() {
    return (
      <div class="container">
        <div class="card border-0 shadow my-4">
          <div class="card-body p-3"></div>
          <div>
            <h3 style={{ textAlign: "center", marginBottom: "15px" }}>
              Create New User
            </h3>
            <form onSubmit={this.onSubmit}>
              <div
                className="form-group"
                style={{
                  marginLeft: "20px",
                  marginBottom: "15px",
                  marginRight: "20px",
                }}
              >
                <label>Username: </label>
                <input
                  type="text"
                  required
                  className="form-control"
                  value={this.state.username}
                  onChange={this.onChangeUsername}
                />
              </div>
              <div
                className="form-group"
                style={{
                  textAlign: "center",
                }}
              >
                <input
                  type="submit"
                  value="Create User"
                  className="btn "
                  style={{
                    backgroundColor: "rgb(160 73 73 / 68%)",
                  }}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
