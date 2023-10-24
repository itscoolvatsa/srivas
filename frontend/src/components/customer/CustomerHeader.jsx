import React, { useContext, useEffect, useState } from "react";
import { CustomerContext } from "../../customHooks/CustomerContext";
import SignUpCustomer from "../customer/SignUpCustomer";
import { Link } from "react-router-dom";
import SignInCustomer from "./SignInCustomer";

const CustomerHeader = () => {
  const { customerState, dispatch } = useContext(CustomerContext);
  const [signUpShow, setSignUpShow] = useState(false);
  const [signInShow, setSignInShow] = useState(false);

  const handleSignUpButton = () => {
    setSignUpShow(true);
  };

  const handleSignInButton = () => {
    setSignInShow(true);
  };

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
            {customerState !== null && customerState["customer"] !== null ? (
              <li className="nav-item">
                <Link
                  className="btn nav-link"
                  aria-current="page"
                  onClick={logout}
                >
                  Logout
                </Link>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    className={`nav-link`}
                    aria-current="page"
                    onClick={handleSignInButton}
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link`}
                    aria-current="page"
                    onClick={handleSignUpButton}
                  >
                    SignUp
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      {signUpShow && (
        <SignUpCustomer signUpShow={signUpShow} setSignUpShow={setSignUpShow} />
      )}
      {signInShow && (
        <SignInCustomer signInShow={signInShow} setSignInShow={setSignInShow} />
      )}
    </nav>
  );
};

export default CustomerHeader;
