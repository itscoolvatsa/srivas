import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import {
  propertyFields,
  propertyFieldsButtons,
  addressFields,
} from "../../constants/formFields";
import { postRequest } from "../../customHooks/axios";
import { formToJSON } from "axios";

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
  const [selectedParkingOptions, setSelectedParkingOptions] = useState(
    new Array()
  );
  const [sucess, setSucess] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleClose = () => setShow(false);

  const nextStep = () => {
    setStep(step + 1);
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
    const isChecked = e.target.checked;

    setSelectedParkingOptions((prevOptions) => {
      const updatedOptions = new Set(prevOptions);

      if (isChecked) {
        updatedOptions.add(optionValue);
      } else {
        updatedOptions.delete(optionValue);
      }

      return Array.from(updatedOptions);
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

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    console.log(selectedFiles);
    setSelectedFiles(selectedFiles);
  };

  const handleSubmit = async (e) => {
    setError("");
    e.preventDefault();

    const formData = new FormData();

    let addPropertyDtoString = {
      addressDto: {
        name: addressState["name"],
        houseNumber: addressState["houseNumber"],
        street: addressState["street"],
        locality: addressState["locality"],
        landmark: addressState["landmark"],
        city: addressState["city"],
        state: addressState["state"],
        pincode: addressState["pincode"],
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

    formData.append(
      "addPropertyDtoString",
      JSON.stringify({
        addressDto: {
          name: addressState["name"],
          houseNumber: addressState["houseNumber"],
          street: addressState["street"],
          locality: addressState["locality"],
          landmark: addressState["landmark"],
          city: addressState["city"],
          state: addressState["state"],
          pincode: addressState["pincode"],
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
      })
    );
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("images", selectedFiles[i]);
    }

    let url = `/owner/property/add/${id}`;
    let headers = { "Content-Type": "multipart/form-data" };
    const [response, err] = await postRequest(formData, url, 201, headers);
    if (response !== null) {
      setPropertyAddedState(true);
      setSucess("property added successfully!!!");
      handleClose();
    }
    if (err !== null) {
      console.log(err);
      setError(err["data"]["data"]["error"]);
    }
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
                          value={propertyState[field.id]}
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
                          value={propertyState[field.id]}
                        />
                      </Form.Group>
                    ))}
                  </div>
                </div>
                {/* Taking Long Description Input */}
                <Form.Group
                  key={propertyFields[7].id}
                  className="mb-3"
                  controlId={propertyFields[7].id}
                >
                  <Form.Label>{propertyFields[7].placeholder} :</Form.Label>
                  <Form.Control
                    className="p-2"
                    onChange={handlePropertyChange}
                    type={propertyFields[7].type}
                    placeholder={propertyFields[7].placeholder}
                    autoComplete={propertyFields[7].autoComplete}
                    name={propertyFields[7].name}
                    required={propertyFields[7].isRequired}
                    value={propertyState[propertyFields[7].id]}
                  />
                </Form.Group>
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
                    value={propertyState[propertyFields[6].id]}
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
                <Form.Group
                  controlId={propertyFieldsButtons[3].id}
                  className="d-flex gap-4"
                >
                  <Form.Label>
                    {propertyFieldsButtons[3].labelText} :
                  </Form.Label>
                  <Form.Control
                    className="w-50"
                    type={propertyFieldsButtons[3].type}
                    multiple={propertyFieldsButtons[3].multiple}
                    name={propertyFieldsButtons[3].name}
                    id={propertyFieldsButtons[3].id}
                    accept={propertyFieldsButtons[3].accept}
                    onChange={handleFileChange}
                  />
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
                          value={addressState[field.id]}
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
                          value={addressState[field.id]}
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
