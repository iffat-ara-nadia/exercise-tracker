import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class EditExercise extends Component {
  state = {
    data: {
      name: "",
      description: "",
      duration: 0,
      date: new Date()
      // gender: ""
    },
    users: []
  };

  async componentDidMount() {
    const response = await axios.get("http://localhost:3200/api/users");

    if (response.data.length > 0) {
      this.setState({
        //   users: ["test1 user", "test2 user", "test3 user"],
        //   name: "test1 user"
        users: response.data.map(user => user.name)
      });
    }
    const exerciseId = this.props.match.params.id;

    const { data: exercise } = await axios.get(
      "http://localhost:3200/api/exercises/" + exerciseId
    );
    this.setState({ data: this.mapToViewModel(exercise) });
  }

  mapToViewModel(exercise) {
    return {
      _id: exercise._id,
      name: exercise.name,
      description: exercise.description,
      duration: exercise.duration,
      date: new Date(exercise.date)
    };
  }

  saveExercise(exercise) {
    if (exercise._id) {
      const body = { ...exercise };
      delete body._id;
      return axios.put(
        "http://localhost:3200/api/exercises/" + exercise._id,
        body
      );
    }
  }

  doSubmit = async () => {
    await this.saveExercise(this.state.data);
    window.location = "/";
  };

  handleSubmit = e => {
    e.preventDefault();

    //call the server
    console.log("Submitted");

    this.doSubmit();
  };

  handleChange = ({ currentTarget }) => {
    const data = { ...this.state.data };
    data[currentTarget.name] = currentTarget.value;
    this.setState({ data });
  };

  //My own implementation : ref. mosh
  handleChangeDate = date => {
    const data = { ...this.state.data };
    data.date = date;
    this.setState({ data });
  };

  render() {
    return (
      <div>
        <h1>Edit Exercise</h1>
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
              {this.state.users.map(user => (
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

          <button className="btn btn-primary">Edit Exercise</button>
        </form>
      </div>
    );
  }
}

export default EditExercise;
