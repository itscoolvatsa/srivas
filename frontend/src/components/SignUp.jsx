import React, { useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { signupFields } from "../constants/formFields";
import { axiosInstance, postRequest } from "../customHooks/axios";
import { OwnerContext } from "../customHooks/OwnerContext";

let fieldState = {};

signupFields.forEach((field) => {
  fieldState[field.id] = "";
});

const SignUp = () => {
  const [signUpState, setSignUpState] = useState(fieldState);
  const [error, setError] = useState("");
  const { dispatch } = useContext(OwnerContext);

  const handleChange = (e) => {
    setSignUpState({ ...signUpState, [e.target.id]: e.target.value });
  };

  const signUpFormSubmission = async (e) => {
    setError("");
    e.preventDefault();

    // if (setSignUpState["password"] !== signUpState["confirmPassword"]) {
    //   setError(["password do not match"]);
    //   return;
    // }

    let body = {
      name: signUpState["name"],
      email: signUpState["email"],
      password: signUpState["password"],
      mobile: signUpState["mobile"],
    };
    let url = "/owner/signup";
    const [response, err] = await postRequest(body, url);
    if (response !== null) {
      dispatch({ type: "LOGIN", payload: response["data"]["owner"] });
    }
    setError(err["data"]["data"]["error"]);
  };

  return (
    <Form className="mb-4" onSubmit={signUpFormSubmission}>
      {signupFields.map((field) => (
        <Form.Group key={field.id} className="mb-3" controlId={field.id}>
          <Form.Label label>{field.labelText}</Form.Label>
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

export default SignUp;
