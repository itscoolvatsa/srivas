import React, { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { signupFields } from "../../constants/formFields";
import { postRequest } from "../../customHooks/axios";
import { CustomerContext } from "../../customHooks/CustomerContext";

let fieldState = {};

signupFields.forEach((field) => {
  fieldState[field.id] = "";
});

const SignUpCustomer = ({ signUpShow, setSignUpShow }) => {
  const { customerState, dispatch } = useContext(CustomerContext);
  const [signUpState, setSignUpState] = useState(fieldState);
  const [error, setError] = useState(null);

  const handleClose = () => {
    setSignUpShow(false);
  };

  const handleChange = (e) => {
    setSignUpState({ ...signUpState, [e.target.id]: e.target.value });
  };

  const signUpFormSubmission = async (e) => {
    setError("");
    e.preventDefault();

    if (signUpState["password"] !== signUpState["confirmPassword"]) {
      setError(["password do not match"]);
      return;
    }

    let body = {
      name: signUpState["name"],
      email: signUpState["email"],
      password: signUpState["password"],
      mobile: signUpState["mobile"],
    };
    let url = "/customer/add";
    const [response, err] = await postRequest(body, url, 201);
    if (response !== null) {
      dispatch({ type: "LOGIN", payload: response["data"]["customer"] });
      setSignUpShow(false);
    }
    if (err !== null) {
      setError(err["data"]["data"]["error"]);
    }
  };

  return (
    <Modal show={signUpShow} onHide={handleClose}>
      <Modal.Header closeButton onClick={handleClose}>
        <Modal.Title>Sign Up:</Modal.Title>
      </Modal.Header>
      <Form className="mb-4 p-2" onSubmit={signUpFormSubmission}>
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
    </Modal>
  );
};

export default SignUpCustomer;
