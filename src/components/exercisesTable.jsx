import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";

class ExercisesTable extends Component {
  columns = [
    { path: "name", label: "Name" },
    { path: "description", label: "Description" },
    { path: "duration", label: "Duration(in minutes)" },
    { path: "date", label: "Date" },
    {
      key: "actions",
      content: (exercise) => (
        <div>
          <Link to={"/edit/" + exercise._id}>
            <button className="btn btn-success btn-sm mr-1">Edit</button>
          </Link>

          <button
            className="btn btn-warning btn-sm"
            onClick={() => this.props.onDelete(exercise)}
          >
            Delete
          </button>
        </div>
      ),
      label: "Actions",
    },
  ];

  render() {
    const { exercises, sortColumn, onSort } = this.props;
    return (
      <Table
        data={exercises}
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default ExercisesTable;

/* {exercises.map((exercise) => (
    <tr key={exercise._id}>
      <td>{exercise.name}</td>
      <td>{exercise.description}</td>
    <td></td> 
      <td>{exercise.duration}</td>
      <td>{exercise.date.substring(0, 10)}</td>
      <td>
        <Link to={"/edit/" + exercise._id}>
          <button className="btn btn-success btn-sm mr-1">Edit</button>
        </Link>
        <button
          className="btn btn-warning btn-sm"
          onClick={() => onDelete(exercise)}
        >
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody> */
