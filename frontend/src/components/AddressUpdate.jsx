import React, { useEffect, useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { addressFields } from "../constants/formFields";
import { postRequest } from "../customHooks/axios";

let fieldState = {};

addressFields.forEach((field) => {
  fieldState[field.id] = "";
});

const leftColumnFields = addressFields.slice(0, 4);
const rightColumnFields = addressFields.slice(4);

const AddressUpdate = ({ show, setShow, id, setAddressUpdate }) => {
  const [addressState, setAddressState] = useState(fieldState);
  const [error, setError] = useState("");
  const [sucess, setSucess] = useState("");

  const handleClose = () => setShow(false);

  const handleChange = (e) => {
    setAddressState({ ...addressState, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setError("");
    setSucess("");
    e.preventDefault();
    let body = {
      name: addressState["name"],
      houseNumber: addressState["houseNumber"],
      street: addressState["street"],
      locality: addressState["locality"],
      landmark: addressState["landmark"],
      city: addressState["city"],
      state: addressState["state"],
      pincode: addressState["pincode"],
    };
    let url = `/owner/address/update/${id}`;
    const [response, err] = await postRequest(body, url, 202);
    if (response !== null) {
      setAddressUpdate(true);
      setSucess("address updated successfully!!!");
    }
    if (err !== null) {
      setError(err["data"]["data"]["error"]);
    }
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
        <div className="text-danger">{error !== null ? error : null}</div>
        <div className="text-success">{sucess !== null ? sucess : null}</div>
        <Button className="btn btn-primary m-3" type="submit">
          Save Address
        </Button>{" "}
      </Form>
    </Modal>
  );
};

export default AddressUpdate;
