import React, { useState } from "react";
import { loginFields } from "../../constants/formFields";
import { Button, Form, Modal } from "react-bootstrap";

let fieldState = {};

loginFields.forEach((field) => {
  fieldState[field.id] = "";
});

const SignInCustomer = ({ signInShow, setSignInShow }) => {
  const [signInState, setSignInState] = useState(fieldState);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setSignInState({ ...signInState, [e.target.id]: e.target.value });
  };

  const handleClose = () => {
    setSignInShow(false);
  };

  const signInFormSubmission = () => {};

  return (
    <Modal show={signInShow} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Sign In:</Modal.Title>
      </Modal.Header>
      <Form className="mb-4 p-2" onSubmit={signInFormSubmission}>
        {loginFields.map((field) => (
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

export default SignInCustomer;
