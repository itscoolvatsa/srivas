import React, { useEffect, useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { addressFields } from "../constants/formFields";

let fieldState = {};

addressFields.forEach((field) => {
  fieldState[field.id] = "";
});

const leftColumnFields = addressFields.slice(0, 4);
const rightColumnFields = addressFields.slice(4);

const AddressUpdate = ({ show, setShow }) => {
  const [addressState, setAddressState] = useState(fieldState);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log(show);
  }, [show]);

  const handleClose = () => setShow(false);

  const handleChange = (e) => {
    console.log(addressState);
    setAddressState({ ...addressState, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Address</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <div className="m-2 p-2">
          <div className="card-body">
            <h5 className="card-title">Address</h5>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="card-body">
                {leftColumnFields.map((field) => (
                  <Form.Group
                    key={field.id}
                    className="mb-3"
                    controlId={field.id}
                  >
                    <Form.Label>{field.labelText} :</Form.Label>
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
              </div>
            </div>
            <div className="col-md-6">
              <div className="card-body">
                {rightColumnFields.map((field) => (
                  <Form.Group
                    key={field.id}
                    className="mb-3"
                    controlId={field.id}
                  >
                    <Form.Label>{field.labelText} :</Form.Label>
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
              </div>
            </div>
          </div>
        </div>
        <Button className="btn btn-primary m-3" type="submit">
          Save Address
        </Button>
      </Form>
    </Modal>
  );
};

export default AddressUpdate;
