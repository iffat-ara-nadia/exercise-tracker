import React, { Component } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Pagination from "./common/pagination";
import { paginate } from "./utils/paginate";
import CategoryGroup from "./common/categoryGroup";
import ExercisesTable from "./exercisesTable";
import _ from "lodash";

class Exercises extends Component {
  state = {
    exercises: [],
    categories: [],
    currentPage: 1,
    pageSize: 4,
    sortColumn: { path: "name", order: "asc" },
  };

  async componentDidMount() {
    const { data: exercises } = await axios.get(
      "http://localhost:3200/api/exercises"
    );

    console.log(exercises);

    const { data } = await axios.get("http://localhost:3200/api/categories");
    const categories = [{ _id: "", name: "All categories" }, ...data];
    console.log(categories);

    this.setState({ exercises, categories });
  }

  handleCategorySelect = (category) => {
    this.setState({ selectedCategory: category });
  };

  handleDelete = async (exercise) => {
    //console.log(exercise);
    const originalExercises = this.state.exercises;
    const exercises = this.state.exercises.filter(
      (exer) => exer._id !== exercise._id
    );
    this.setState({ exercises });

    try {
      await axios.delete("http://localhost:3200/api/exercises/" + exercise._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This movie has already been deleted");
    }

    this.setState({
      exercises: originalExercises,
    });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      exercises: allExercises,
      // categories,
      // selectedCategory,
      currentPage,
      pageSize,
      sortColumn,
    } = this.state;

    /*  const filtered =
      selectedCategory && selectedCategory._id
        ? allExercises.filter((e) => e.category._id === selectedCategory._id)
        : allExercises; */
    const sorted = _.orderBy(
      allExercises,
      [sortColumn.path],
      [sortColumn.order]
    );

    const exercises = paginate(sorted, currentPage, pageSize);

    return { exercises };
  };

  render() {
    const count = this.state.exercises.length;

    const {
      categories,
      selectedCategory,
      currentPage,
      pageSize,
      sortColumn,
    } = this.state;

    if (count === 0) return <p>No exercise is not logged in the database</p>;

    const { exercises } = this.getPagedData();

    return (
      <div className="row">
        <div className="my-3 col-2">
          <CategoryGroup
            items={categories}
            selectedItem={selectedCategory}
            onCategorySelect={this.handleCategorySelect}
          />
        </div>
        <div className="col">
          <h1>Exercises Log</h1>
          <p>Showing {count} exercises in the database.</p>

          <ExercisesTable
            exercises={exercises}
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />

          <Pagination
            itemsCount={count} //Error: I wrote {exercises}, thats why pagesCount was NaN.
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Exercises;
