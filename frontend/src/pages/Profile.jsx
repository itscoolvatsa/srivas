import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CustomerContext } from "../customHooks/CustomerContext";
import CustomerHeader from "../components/customer/CustomerHeader";

const Profile = () => {
  const navigate = useNavigate();
  let { id } = useParams();
  const { customerState } = useContext(CustomerContext);

  console.log(customerState);

  useEffect(() => {
    if (customerState === null || customerState["customer"] === null) {
      //   const id = ownerState["owner"]["id"];
      return navigate(`/`);
    }
  });

  return (
    <div>
      <CustomerHeader page={"profile"} />
    </div>
  );
};

export default Profile;
