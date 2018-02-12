import React, { Component } from 'react';

class Navbar extends Component {
  render() {
    return (
      <div className="navbar">
        <nav className="navbar navbar-dark bg-dark">
          <a className="navbar-brand" href="#">BNK48 Gallery</a>
          <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
        </nav>
      </div>
    );
  }
}

export default Navbar;