import React, { useContext, useEffect, useState } from "react";
import { OwnerContext } from "../../customHooks/OwnerContext";
import { useNavigate, useParams } from "react-router-dom";
import OwnerHeader from "../../components/owner/OwnerHeader";
import PropertyCard from "../../components/PropertyCard";
import { getRequest } from "../../customHooks/axios";

const Properties = () => {
  const { ownerState } = useContext(OwnerContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [owner, setOwner] = useState(null);
  const [properties, setProperties] = useState(null);

  const findProperties = async () => {
    const url = `/owner/property/get/${id}`;
    const successCode = 200;

    const [response, error] = await getRequest(url, successCode);
    if (response != null) {
      setProperties(response["data"]["properties"]);
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
  }, [ownerState, navigate, id]);

  useEffect(() => {
    findProperties();
  }, []);

  return (
    <div>
      <OwnerHeader active={"property"} id={id} />
      <div className="p-4 d-flex align-items-center justify-content-between border-bottom">
        <div>Properties You have Published:</div>
        <button className="btn btn-primary">Add Property</button>
      </div>
      {properties !== null
        ? properties.map((property, index) => (
            <PropertyCard key={index} property={property} />
          ))
        : "You don't have any property"}
    </div>
  );
};

export default Properties;
