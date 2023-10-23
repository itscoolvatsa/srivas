import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import {
  propertyFields,
  propertyFieldsButtons,
  addressFields,
} from "../../constants/formFields";
import { postRequest } from "../../customHooks/axios";

let propertyFieldState = {};
let addressFieldState = {};

propertyFields.forEach((field) => {
  propertyFieldState[field.id] = "";
});

addressFields.forEach((field) => {
  addressFieldState[field.id] = "";
});

const leftPropertyColumnFields = propertyFields.slice(0, 3);
const rightPropertyColumnFields = propertyFields.slice(3, 6);

const leftAddressColumnFields = addressFields.slice(0, 4);
const righAddressColumnFields = addressFields.slice(4);

const AddProperty = ({ id, show, setShow, setPropertyAddedState }) => {
  const [propertyState, setPropertyState] = useState(propertyFieldState);
  const [addressState, setAddressState] = useState(addressFieldState);
  const [error, setError] = useState(null);
  const [step, setStep] = useState(1);
  const [furnishingStatus, setFurnishingStatus] = useState("true");
  const [gatedSecurity, setGatedSecurity] = useState("true");
  const [selectedParkingOptions, setSelectedParkingOptions] = useState([]);
  const [sucess, setSucess] = useState("");

  const handleClose = () => setShow(false);

  // @TODO
  const nextStep = () => {
    setError("");
    const requiredFields = propertyFields
      .concat(propertyFieldsButtons)
      .filter((field) => field.isRequired)
      .map((field) => field.id);

    const isStep1FieldsFilled = requiredFields.every(
      (fieldId) => propertyState[fieldId] !== ""
    );

    if (isStep1FieldsFilled) {
      setStep(step + 1);
    } else {
      setError("Please fill in all required fields");
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handlePropertyChange = (e) => {
    setPropertyState({ ...propertyState, [e.target.id]: e.target.value });
  };

  const handleAddressChange = (e) => {
    setAddressState({ ...addressState, [e.target.id]: e.target.value });
  };

  const handleParkingChange = (e) => {
    const optionValue = e.target.value;
    setSelectedParkingOptions((prevOptions) => {
      if (e.target.checked) {
        if (!prevOptions.includes(optionValue)) {
          return [...prevOptions, optionValue];
        }
      } else {
        return prevOptions.filter((item) => item !== optionValue);
      }
      return prevOptions;
    });
  };

  const handleRadioChange = (e) => {
    if (
      e.target.id === "furnishingStatus-true" ||
      e.target.id === "furnishingStatus-false"
    ) {
      setFurnishingStatus(e.target.value);
    }
    if (
      e.target.id === "gatedSecurity-true" ||
      e.target.id === "gatedSecurity-false"
    ) {
      setGatedSecurity(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    setError("");
    const requiredFields = addressFields
      .filter((field) => field.isRequired)
      .map((field) => field.id);

    const isStep2FieldsFilled = requiredFields.every(
      (fieldId) => propertyState[fieldId] !== ""
    );

    if (isStep2FieldsFilled !== null) {
      setError("Please fill in all required fields");
      return;
    }
    e.preventDefault();
    setError("");
    e.preventDefault();

    let body = {
      addressDto: {
        name: addressState["name"],
        houseNumber: addressState["houseNumber"],
        street: addressState["street"],
        locality: addressState[""],
        landmark: addressState[""],
        city: addressState[""],
        state: addressState[""],
        pincode: addressState[""],
      },
      propertyDto: {
        rent: propertyState["rent"],
        deposit: propertyState["deposit"],
        areaSqFt: propertyState["areaSqFt"],
        bedroom: propertyState["bedroom"],
        bathroom: propertyState["bathroom"],
        floor: propertyState["floor"],
        description: propertyState["description"],
        shortDescription: propertyState["shortDescription"],
        parking: selectedParkingOptions,
        furnishingStatus: furnishingStatus,
        gatedSecurity: gatedSecurity,
      },
    };

    let url = `/owner/property/add/${id}`;
    const [response, err] = await postRequest(body, url, 201);
    if (response !== null) {
      setPropertyAddedState(true);
      setSucess("property added successfully!!!");
    }
    if (err !== null) {
      setError(err["data"]["data"]["error"]);
    }

    console.log(body);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Property</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        {step === 1 && (
          <div>
            <div className="m-2 p-2">
              <div className="card-body">
                <h5 className="card-title">Property Details:</h5>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="card-body">
                    {leftPropertyColumnFields.map((field) => (
                      <Form.Group
                        key={field.id}
                        className="mb-3"
                        controlId={field.id}
                      >
                        <Form.Label>{field.labelText} :</Form.Label>
                        <Form.Control
                          onChange={handlePropertyChange}
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
                    {rightPropertyColumnFields.map((field) => (
                      <Form.Group
                        key={field.id}
                        className="mb-3"
                        controlId={field.id}
                      >
                        <Form.Label>{field.labelText} :</Form.Label>
                        <Form.Control
                          onChange={handlePropertyChange}
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
                {/* Taking Long Description Input */}
                <Form.Group
                  key={propertyFields[6].id}
                  className="mb-3"
                  controlId={propertyFields[6].id}
                >
                  <Form.Label>{propertyFields[6].placeholder} :</Form.Label>
                  <Form.Control
                    className="p-2"
                    onChange={handlePropertyChange}
                    type={propertyFields[6].type}
                    placeholder={propertyFields[6].placeholder}
                    autoComplete={propertyFields[6].autoComplete}
                    name={propertyFields[6].name}
                    required={propertyFields[6].isRequired}
                  />
                </Form.Group>

                <Form.Group
                  controlId={propertyFieldsButtons[0].id}
                  className="d-flex gap-4"
                >
                  <Form.Label>
                    {propertyFieldsButtons[0].labelText} :
                  </Form.Label>
                  <Form.Check
                    type={propertyFieldsButtons[0].type}
                    label="Furnished"
                    id={`${propertyFieldsButtons[0].id}-true`}
                    name={`${propertyFieldsButtons[0].name}-true`}
                    value="true"
                    checked={furnishingStatus === "true"}
                    onChange={handleRadioChange}
                  />
                  <Form.Check
                    type={propertyFieldsButtons[0].type}
                    label="Unfurnished"
                    id={`${propertyFieldsButtons[0].id}-false`}
                    name={`${propertyFieldsButtons[0].name}-false`}
                    value="false"
                    checked={furnishingStatus === "false"}
                    onChange={handleRadioChange}
                  />
                </Form.Group>

                <Form.Group
                  controlId={propertyFieldsButtons[1].id}
                  className="d-flex gap-4"
                >
                  <Form.Label>
                    {propertyFieldsButtons[1].labelText} :
                  </Form.Label>
                  <Form.Check
                    type={propertyFieldsButtons[1].type}
                    label="Available"
                    id={`${propertyFieldsButtons[1].id}-true`}
                    name={`${propertyFieldsButtons[1].name}-true`}
                    value="true"
                    checked={gatedSecurity === "true"}
                    onChange={handleRadioChange}
                  />
                  <Form.Check
                    type={propertyFieldsButtons[1].type}
                    label="Unavailable"
                    id={`${propertyFieldsButtons[1].id}-false`}
                    name={`${propertyFieldsButtons[1].name}-false`}
                    value="false"
                    checked={gatedSecurity === "false"}
                    onChange={handleRadioChange}
                  />
                </Form.Group>

                <Form.Group
                  controlId={propertyFieldsButtons[0].id}
                  className="d-flex gap-4"
                >
                  <Form.Label>
                    {propertyFieldsButtons[2].labelText} :
                  </Form.Label>
                  {propertyFieldsButtons[2].options.map((option) => (
                    <Form.Check
                      key={option.value}
                      type={propertyFieldsButtons[2].type}
                      label={option.label}
                      id={`${propertyFieldsButtons[2].id}-${option.value}`}
                      name={`${propertyFieldsButtons[2].name}-${option.value}`}
                      value={option.value}
                      checked={selectedParkingOptions.includes(option.value)}
                      onChange={handleParkingChange}
                    />
                  ))}
                </Form.Group>
              </div>
              <div className="text-danger">{error !== null ? error : null}</div>
              <Button variant="primary" onClick={nextStep}>
                Next
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <div className="m-2 p-2">
              <div className="card-body">
                <h5 className="card-title">Property Details:</h5>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="card-body">
                    {leftAddressColumnFields.map((field) => (
                      <Form.Group
                        key={field.id}
                        className="mb-3"
                        controlId={field.id}
                      >
                        <Form.Label>{field.labelText} :</Form.Label>
                        <Form.Control
                          onChange={handleAddressChange}
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
                    {righAddressColumnFields.map((field) => (
                      <Form.Group
                        key={field.id}
                        className="mb-3"
                        controlId={field.id}
                      >
                        <Form.Label>{field.labelText} :</Form.Label>
                        <Form.Control
                          onChange={handleAddressChange}
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
              <div className="text-danger">{error !== null ? error : null}</div>
              <div className="text-success">
                {sucess !== "" ? sucess : null}
              </div>
              <Button variant="primary" onClick={prevStep}>
                Prev
              </Button>
              <Button
                type="submit"
                className="ms-4"
                variant="primary"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </div>
          </div>
        )}
      </Form>
    </Modal>
  );
};

export default AddProperty;
