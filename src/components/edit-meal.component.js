/** @format */

import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class EditMeal extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeCalories = this.onChangeCalories.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      description: "",
      calories: 0,
      date: new Date(),
      users: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/meals/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          username: response.data.username,
          description: response.data.description,
          calories: response.data.calories,
          date: new Date(response.data.date),
        });
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get("http://localhost:5000/users/")
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map((user) => user.username),
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onChangeCalories(e) {
    this.setState({
      calories: e.target.value,
    });
  }

  onChangeDate(date) {
    this.setState({
      date: date,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const meal = {
      username: this.state.username,
      description: this.state.description,
      calories: this.state.calories,
      date: this.state.date,
    };

    console.log(meal);

    axios
      .post(
        "http://localhost:5000/meals/update/" + this.props.match.params.id,
        meal
      )
      .then((res) => console.log(res.data));

    window.location = "/";
  }

  render() {
    return (
      <div class="container">
        <div class="card border-0 shadow my-4">
          <div class="card-body p-3"></div>
          <div class="container">
            <div>
              <h3 style={{ textAlign: "center" }}>Edit Meal</h3>
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
                  <select
                    ref="userInput"
                    required
                    className="form-control"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                  >
                    {this.state.users.map(function (user) {
                      return (
                        <option key={user} value={user}>
                          {user}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div
                  className="form-group"
                  style={{
                    marginLeft: "20px",
                    marginBottom: "15px",
                    marginRight: "20px",
                  }}
                >
                  <label>Description: </label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    value={this.state.description}
                    onChange={this.onChangeDescription}
                  />
                </div>
                <div
                  className="form-group"
                  style={{
                    marginLeft: "20px",
                    marginBottom: "15px",
                    marginRight: "20px",
                  }}
                >
                  <label>Calories: </label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.calories}
                    onChange={this.onChangeCalories}
                  />
                </div>
                <div
                  className="form-group"
                  style={{
                    marginLeft: "20px",
                    marginBottom: "15px",
                    marginRight: "20px",
                  }}
                >
                  <label>Date: </label>
                  <div>
                    <DatePicker
                      selected={this.state.date}
                      onChange={this.onChangeDate}
                    />
                  </div>
                </div>

                <div className="form-group" style={{ textAlign: "center" }}>
                  <input
                    type="submit"
                    value="Edit Meal"
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
      </div>
    );
  }
}
