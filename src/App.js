import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Navbar from "./components/common/navbar";
import Exercises from "./components/exercises";
import CreateExercise from "./components/createExercise";
import EditExercise from "./components/editExercise";
import CreateUser from "./components/createUser";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <main className="container">
          <Switch>
            <Route path="/edit/:id" component={EditExercise}></Route>
            <Route path="/create" component={CreateExercise}></Route>
            <Route path="/exercises" component={Exercises}></Route>
            <Route path="/user" component={CreateUser}></Route>
            <Redirect from="/" exact to="/exercises"></Redirect>
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
