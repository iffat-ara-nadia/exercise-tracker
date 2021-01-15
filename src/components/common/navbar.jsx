import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">
          Exercise Tracker
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/exercises">
                Exercises log
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/create">
                Create Exercise
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/user">
                Create User
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
