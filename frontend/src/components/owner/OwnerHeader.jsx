import React, { useContext, useEffect, useState } from "react";
import { OwnerContext } from "../../customHooks/OwnerContext";

const OwnerHeader = ({ active }) => {
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
              <a
                className={`nav-link ${propertyClass}`}
                aria-current="page"
                href="#"
              >
                Properties
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${profileClass}`}
                aria-current="page"
                href="#"
              >
                Profile
              </a>
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
