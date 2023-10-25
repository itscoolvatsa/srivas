import React from "react";
import { Modal, ModalBody } from "react-bootstrap";

const ShowOwnerDetails = ({ owner, showOwnerShow, setShowOwnerShow }) => {
  const { email, name, mobile } = owner;
  const handleClose = () => {
    setShowOwnerShow(false);
  };

  return (
    <Modal show={showOwnerShow} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>OwnerDetails: </Modal.Title>
      </Modal.Header>
      <ModalBody>
        <p>Email: {email}</p>
        <p>Name: {name}</p>
        <p>Mobile: {mobile}</p>
      </ModalBody>
    </Modal>
  );
};

export default ShowOwnerDetails;
