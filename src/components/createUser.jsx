import React, { Component } from "react";
import axios from "axios";
//import { apiUrl } from "../config.json";

class CreateUser extends Component {
  state = {
    data: { name: "" }
  };

  handleSubmit = async e => {
    e.preventDefault();

    //call the server
    console.log("Submitted");
    const response = await axios.post("http://localhost:3200/api/users", {
      name: this.state.data.name
    });
    console.log(response);

    //this.setState({ user: "" }); //??? How to implement this logic properly
  };

  handleChange = ({ currentTarget }) => {
    const data = { ...this.state.data };
    data[currentTarget.name] = currentTarget.value;
    this.setState({ data });
  };

  render() {
    return (
      <div>
        <h1>Create User</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Username</label>
            <input
              name="name"
              value={this.state.name}
              type="text"
              className="form-control"
              onChange={this.handleChange}
            />
          </div>
          <button className="btn btn-primary">Create New User</button>
        </form>
      </div>
    );
  }
}

export default CreateUser;
