import React, { useContext, useEffect, useState } from "react";
import { CustomerContext } from "../customHooks/CustomerContext";
import { Link } from "react-router-dom";

const Header = ({ active, id }) => {
  const { customerState, dispatch } = useContext(CustomerContext);
  const { customer } = customerState;

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Srivas
        </a>
        <div className="d-flex" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="" className={`nav-link`} aria-current="page">
                Properties
              </Link>
            </li>
            <li className="nav-item">
              <Link to="" className={`nav-link `} aria-current="page">
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <a className="btn nav-link" aria-current="page" onClick={logout}>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
