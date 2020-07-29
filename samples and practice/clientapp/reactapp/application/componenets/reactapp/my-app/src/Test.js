import React, { Component } from "react";
import { Link } from "react-router";

class Navbar extends Component {
  render() {
    return (
      <div className="Navbar">
        <ul className="navbar-list">
          <li className="active">
            <Link to={"/home"}>Home</Link>
          </li>
          <li>
            <Link to={"/about"}>About Us</Link>
          </li>
          <li>
            <Link to={"/pricing"}>Pricing</Link>
          </li>
          <li className="active">
            <Link to={"/home"}>Home</Link>
          </li>
          <li>
            <Link to={"/about"}>About Us</Link>
          </li>
          <li>
            <Link to={"/pricing"}>Pricing</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default Navbar;
