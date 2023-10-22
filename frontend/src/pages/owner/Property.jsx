import React, { useContext, useEffect, useState } from "react";
import { OwnerContext } from "../../customHooks/OwnerContext";
import { useNavigate, useParams } from "react-router-dom";
import OwnerHeader from "../../components/owner/OwnerHeader";

const Property = () => {
  const { ownerState } = useContext(OwnerContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [owner, setOwner] = useState(null);

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
  return (
    <div>
      <OwnerHeader active={"property"} id={id} />
      propery
    </div>
  );
};

export default Property;
