/** @format */

import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Chart from "./chart";
import Chart1 from "./chart1";

const Meal = (props) => (
  <tr>
    <td>{props.meal.username}</td>
    <td>{props.meal.description}</td>
    <td>{props.meal.calories}</td>
    <td>{props.meal.date.substring(0, 10)}</td>
    <td>
      <Link to={"/edit/" + props.meal._id} style={{ color: " #a04949" }}>
        Edit
      </Link>{" "}
      |{" "}
      <a
        href="#"
        onClick={() => {
          props.deleteMeal(props.meal._id);
          window.location.reload(false);
        }}
        style={{ color: " #a04949" }}
      >
        Delete
      </a>
    </td>
  </tr>
);

export default class MealsList extends Component {
  constructor(props) {
    super(props);

    this.deleteMeal = this.deleteMeal.bind(this);

    this.state = { meals: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/meals/")
      .then((response) => {
        this.setState({ meals: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteMeal(id) {
    axios.delete("http://localhost:5000/meals/" + id).then((response) => {
      console.log(response.data);
    });

    this.setState({
      meals: this.state.meals.filter((el) => el._id !== id),
    });
  }

  mealList() {
    return this.state.meals.map((currentmeal) => {
      return (
        <Meal
          meal={currentmeal}
          deleteMeal={this.deleteMeal}
          key={currentmeal._id}
        />
      );
    });
  }

  render() {
    return (
      <body>
        <div class="container">
          <div class="card border-0 shadow my-4">
            <div class="card-body p-5">
              <h3 style={{ textAlign: "center", marginBottom: "15px" }}>
                Food Tracker
              </h3>
              <table className="table" style={{ textAlign: "center" }}>
                <thead
                  className="thead"
                  style={{ backgroundColor: "rgb(160 73 73 / 68%)" }}
                >
                  <tr>
                    <th>Username</th>
                    <th>Description</th>
                    <th>Calories</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>{this.mealList()}</tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="container">
          <div class="card border-0 shadow my-2" style={{ padding: "2rem" }}>
            <div class="card-body p-1"></div>
            <Chart />
            <Chart1 />
          </div>
        </div>
      </body>
    );
  }
}
