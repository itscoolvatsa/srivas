import React, { useContext, useState } from "react";
import SignIn from "../../components/SignIn";
import { Button } from "react-bootstrap";
import "./Owner.css";
import SignUp from "../../components/SignUp";
import { useNavigate } from "react-router-dom";
import { OwnerContext } from "../../customHooks/OwnerContext";

const Owner = () => {
  const { ownerState } = useContext(OwnerContext);
  const [formState, setFormState] = useState(false);
  const navigate = useNavigate();

  if (ownerState != null && ownerState["owner"] != null) {
    const id = ownerState["owner"]["id"];
    return navigate(`/owner/dashboard/${id}`); // Use navigate to redirect
  } else {
    const formStateHandler = () => {
      formState ? setFormState(false) : setFormState(true);
    };

    return (
      <section className="owner__section">
        <div className="container-lg rounded p-5 w-50 bg-info flex-column justify-content-center">
          {!formState ? (
            <>
              <SignIn onClick={formStateHandler} />
              not a user?
              <Button className="btn ms-2" onClick={formStateHandler}>
                Signup
              </Button>
            </>
          ) : (
            <>
              <SignUp />
              already have an account?
              <Button className="btn ms-2" onClick={formStateHandler}>
                Signin
              </Button>
            </>
          )}
        </div>
      </section>
    );
  }
};

export default Owner;
