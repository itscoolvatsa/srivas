import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CustomerContext } from "../customHooks/CustomerContext";
import CustomerHeader from "../components/customer/CustomerHeader";
import AddPackage from "../components/customer/AddPackage";
import { Button } from "react-bootstrap";
import { getRequest } from "../customHooks/axios";

const Profile = () => {
  const navigate = useNavigate();
  let { id } = useParams();
  const { customerState } = useContext(CustomerContext);
  const [customerPackage, setCustomerPackage] = useState(null);
  const [addPackageShow, setAddPackageShow] = useState(false);
  const [addPackageStatus, setAddPackageStatus] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const fetchPackageData = async () => {
    let url = `/customer/get/package/${id}`;
    const [response, err] = await getRequest(url, 200);
    if (response !== null) {
      setCustomerPackage(response["data"]["package"]);
    }
    if (err !== null) {
      setCustomerPackage(null);
    }
  };

  useEffect(() => {
    if (customerState === null || customerState["customer"] === null) {
      return navigate(`/`);
    }

    fetchPackageData();
    setLoaded(true);
  }, []);

  useEffect(() => {
    fetchPackageData();
  }, [addPackageStatus]);

  const handleAddProperty = () => {
    setAddPackageShow(true);
  };
  return (
    <div>
      <CustomerHeader page={"profile"} />
      {loaded ? (
        <div className="container">
          {customerPackage === null || customerPackage["remainingView"] <= 0 ? (
            <div className="m-4">
              <div>
                {customerPackage !== null &&
                customerPackage["remainingView"] <= 0
                  ? "Your don't have any views left so add another package"
                  : "You don't have any package you can add one here"}
              </div>
              <Button
                onClick={handleAddProperty}
                variant="primary"
                type="button"
                className="mt-4"
              >
                Add Package
              </Button>
            </div>
          ) : (
            <div>
              <p>Name: {customerState["customer"]["name"]}</p>
              <p>Email: {customerState["customer"]["email"]}</p>
              <p>Package: {customerPackage["name"]}</p>
              <p>Remaining View: {customerPackage["remainingView"]}</p>
              <p>Total View: {customerPackage["totalView"]}</p>
              <p>
                Purchased On:{" "}
                {new Date(customerPackage["postedOn"]).toLocaleDateString()}
              </p>
            </div>
          )}
          <AddPackage
            id={id}
            addPackageShow={addPackageShow}
            setAddPackageShow={setAddPackageShow}
            setCustomerPackage={setCustomerPackage}
            setAddPackageStatus={setAddPackageStatus}
          />
        </div>
      ) : (
        "Loading"
      )}
    </div>
  );
};

export default Profile;
