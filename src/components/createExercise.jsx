import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class CreateExercise extends Component {
  state = {
    data: {
      name: "",
      description: "",
      duration: 0,
      date: new Date(),
      // gender: ""
    },
    users: [],
  };

  async componentDidMount() {
    const response = await axios.get("http://localhost:3200/api/users");

    if (response.data.length > 0) {
      this.setState({
        //   users: ["test1 user", "test2 user", "test3 user"],
        //   name: "test1 user"
        users: response.data.map((user) => user.name),
      });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    //call the server
    console.log("Submitted");

    this.doSubmit();
  };

  doSubmit = async () => {
    const { name, description, duration, date } = this.state.data;
    const response = await axios.post("http://localhost:3200/api/exercises", {
      name: name,
      description: description,
      duration: duration,
      date: date,
    });
    console.log(response);
    window.location = "/";
  };

  handleChange = ({ currentTarget }) => {
    const data = { ...this.state.data };
    data[currentTarget.name] = currentTarget.value;
    this.setState({ data });
  };

  //My own implementation : ref. mosh
  handleChangeDate = (date) => {
    const data = { ...this.state.data };
    data.date = date;
    this.setState({ data });
  };

  render() {
    return (
      <div>
        <h1>Create New Exercise</h1>
        {/* form >(div.form-group>label+input.form-control)*4    */}
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Username</label>
            <select
              value={this.state.data.name}
              id="name"
              name="name"
              type="text"
              onChange={this.handleChange}
              className="form-control"
            >
              {/* <option value="" /> */}
              {this.state.users.map((user) => (
                <option key={user} value={user}>
                  {user}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description">Exercise Description</label>
            <textarea
              name="description"
              id="description"
              value={this.state.data.description}
              type="text"
              onChange={this.handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="duration">Duration(in minutes):</label>
            <input
              name="duration"
              id="duration"
              value={this.state.data.duration}
              type="number"
              min="0"
              onChange={this.handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <div>
              <DatePicker
                selected={this.state.data.date}
                onChange={this.handleChangeDate}
              />
            </div>
          </div>

          <button className="btn btn-primary">Create</button>
        </form>
      </div>
    );
  }
}

export default CreateExercise;
