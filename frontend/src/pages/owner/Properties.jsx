import React, { useContext, useEffect, useState } from "react";
import { OwnerContext } from "../../customHooks/OwnerContext";
import { useNavigate, useParams } from "react-router-dom";
import OwnerHeader from "../../components/owner/OwnerHeader";
import PropertyCard from "../../components/PropertyCard";
import { getRequest } from "../../customHooks/axios";
import AddProperty from "../../components/owner/AddProperty";

const Properties = () => {
  const { ownerState } = useContext(OwnerContext);
  const navigate = useNavigate();
  let { id } = useParams();
  const [owner, setOwner] = useState(null);
  const [properties, setProperties] = useState(null);
  const [propertyAddedState, setPropertyAddedState] = useState(false);
  const [show, setShow] = useState(false);
  const [addressAvailable, setAddressAvailable] = useState(false);

  const findProperties = async () => {
    const url = `/owner/property/get/${id}`;
    const successCode = 200;

    const [response, error] = await getRequest(url, successCode);
    if (response != null) {
      setProperties(response["data"]["properties"]);
    }
  };

  const findAddress = async (id) => {
    console.log(id);
    let url = `/owner/address/get/${id}`;
    let successCode = 200;
    const [response, err] = await getRequest(url, successCode);
    if (err === null) {
      return true;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (ownerState == null || ownerState["owner"] == null) {
        navigate(`/owner`);
      } else {
        setOwner(ownerState["owner"]);
      }
    };

    fetchData();
  }, [ownerState, navigate]);

  useEffect(() => {
    findProperties();
  }, []);

  const openUpdateDialog = () => {
    const fetchData = async () => {
      if (!(await findAddress(id))) {
        alert("please add your address first to add a new property");
      } else {
        setShow(true);
      }
    };
    fetchData();
  };

  return (
    <div>
      <OwnerHeader active={"property"} id={id} />
      <div className="p-4 d-flex align-items-center justify-content-between border-bottom">
        <div>Properties You have Published:</div>
        <button className="btn btn-primary" onClick={openUpdateDialog}>
          Add Property
        </button>
      </div>
      {properties !== null
        ? properties.map((property, index) => (
            <PropertyCard key={index} property={property} />
          ))
        : "You don't have any property"}
      <AddProperty
        id={id}
        show={show}
        setShow={setShow}
        setPropertyAddedState={setPropertyAddedState}
      />
    </div>
  );
};

export default Properties;
