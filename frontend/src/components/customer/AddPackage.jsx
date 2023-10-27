import React, { useState } from "react";
import { Button, Form, Modal, ModalBody } from "react-bootstrap";
import { postRequest } from "../../customHooks/axios";

const AddPackage = ({
  addPackageShow,
  setAddPackageShow,
  id,
  setCustomerPackage,
  setAddPackageStatus,
}) => {
  const [error, setError] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState("Tier 1");

  const handleChange = (e) => {
    setSelectedPackage(e.target.value);
  };

  const getTotalView = (tier) => {
    if (tier === "Tier 1") {
      return 50;
    } else if (tier === "Tier 2") {
      return 20;
    } else {
      return 10;
    }
  };

  const addPackageFormSubmission = async (e) => {
    setError("");
    e.preventDefault();

    let body = {
      totalView: getTotalView(selectedPackage),
      name: selectedPackage,
    };

    let url = `/customer/add/package/${id}`;
    const [response, err] = await postRequest(body, url, 202);
    if (response !== null) {
      setCustomerPackage(response["data"]["package"]);
      setAddPackageShow(false);
      setAddPackageStatus(true);
    }
    if (err !== null) {
      console.log(err);
      setError(err["data"]["data"]["error"]);
    }
  };

  const handleClose = () => {
    setAddPackageShow(false);
  };

  return (
    <Modal show={addPackageShow} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Package:</Modal.Title>
      </Modal.Header>
      <ModalBody>
        <p>Tier 1: 50 views</p>
        <p>Tier 2: 20 views</p>
        <p>Tier 3: 10 views</p>
      </ModalBody>
      <Form className="mb-4 p-2" onSubmit={addPackageFormSubmission}>
        <Form.Group className="mb-3" controlId="package">
          <Form.Label label>Package:</Form.Label>
          <Form.Select
            onChange={handleChange}
            value={selectedPackage} // Set the selected package value
            name="package"
            required={true}
          >
            <option value="Tier 1">Tier 1</option>
            <option value="Tier 2">Tier 2</option>
            <option value="Tier 3">Tier 3</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
        <div className="text-danger">{error !== null ? error : null}</div>
      </Form>
    </Modal>
  );
};

export default AddPackage;
