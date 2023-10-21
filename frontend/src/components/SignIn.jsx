import React, { useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { loginFields } from "../constants/formFields";
import { postRequest } from "../customHooks/axios";
import { OwnerContext } from "../customHooks/OwnerContext";

let fieldState = {};

loginFields.forEach((field) => {
  fieldState[field.id] = "";
});

const SignIn = () => {
  const [loginState, setLoginState] = useState(fieldState);
  const [error, setError] = useState("");
  const { dispatch, ownerState } = useContext(OwnerContext);

  const handleChange = (e) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };

  const loginFormSubmission = async (e) => {
    setError("");
    e.preventDefault();
    let body = {
      email: loginState["email"],
      password: loginState["password"],
    };
    let url = "/owner/signin";
    const [response, err] = await postRequest(body, url);
    if (response !== null) {
      dispatch({ type: "LOGIN", payload: response["data"]["owner"] });
    }
    if (err !== null) {
      setError(err["data"]["data"]["error"]);
    }
  };

  return (
    <Form className="mb-4" onSubmit={loginFormSubmission}>
      {loginFields.map((field) => (
        <Form.Group key={field.id} className="mb-3" controlId={field.id}>
          <Form.Label>{field.labelText}</Form.Label>
          <Form.Control
            onChange={handleChange}
            type={field.type}
            placeholder={field.placeholder}
            autoComplete={field.autoComplete}
            name={field.name}
            required={field.isRequired}
          />
        </Form.Group>
      ))}
      <Button variant="primary" type="submit">
        Submit
      </Button>
      <div className="text-danger">{error !== null ? error : null}</div>
    </Form>
  );
};

export default SignIn;
