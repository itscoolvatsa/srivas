import React, { useContext, useEffect, useState } from "react";
import { OwnerContext } from "../../customHooks/OwnerContext";
import { Link } from "react-router-dom";

const OwnerHeader = ({ active, id }) => {
  const { dispatch } = useContext(OwnerContext);
  const [propertyClass, setPropertyClass] = useState("");
  const [profileClass, setProfileClass] = useState("");

  useEffect(() => {
    if (active == "property") {
      setPropertyClass("active");
      setProfileClass("");
    }
    if (active == "profile") {
      setPropertyClass("");
      setProfileClass("active");
    }
  }, [active]);

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
              <Link
                to={`/owner/property/${id}`}
                className={`nav-link ${propertyClass}`}
                aria-current="page"
              >
                Properties
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={`/owner/dashboard/${id}`}
                className={`nav-link ${profileClass}`}
                aria-current="page"
              >
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

export default OwnerHeader;
