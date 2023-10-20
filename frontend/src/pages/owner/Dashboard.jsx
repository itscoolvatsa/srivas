import React, { useContext, useState } from "react";
import { OwnerContext } from "../../customHooks/OwnerContext";
import { useNavigate, useParams } from "react-router-dom";

const Dashboard = () => {
  const { ownerState } = useContext(OwnerContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const { owner, setOwner } = useState(null);

  if (ownerState == null || ownerState["owner"] == null) {
    // console.log(ownerState);
    // console.log(id);
    return navigate(`/owner`);
  } else {
    // const user =
  }

  return <div>dashboard</div>;
};

export default Dashboard;
