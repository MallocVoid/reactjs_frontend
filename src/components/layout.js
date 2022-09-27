import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Link, Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/navbar.css";


function Layout({token}) {
  console.log(token);
  
  // TODO: Implement the link hiding in a way that is more secure (the pages are still accessible directly)
  // and less quick and dirty, i.e. hacky.
  let apps;
  let logout;
  let login;

  if(token) {
    apps = <Link to="/apps" className="nav-item nav-link">Apps</Link>
    logout = <Link to="/logout" className="nav-item nav-link">Logout</Link>
    login = null
  }
  else {
    apps = null;
    logout = null;
    login = <Link to="/login" className="nav-item nav-link">Login</Link>
  }

  return (
    <div className="main_banner sticky-top">
      <nav className="navbar navbar-expand-lg p-3 navbar-dark transparent-nav nav-js">
        <Link to="/" className="nav-item nav-link active">
          Home
        </Link>
        {apps}
        {login}
        {logout}        
      </nav>
      <Outlet />
    </div>
  );
}

Layout.propTypes = {
  token: PropTypes.string
};

export default Layout;
