import React, { Component } from "react";

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-light bg-info">
        <a className="navbar-brand text-white" href="#">
          <h2>Palautesivu</h2>
        </a>
      </nav>
    );
  }
}

export default NavBar;
