import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRequest, postRequest } from "../customHooks/axios";
import { Card, Carousel } from "react-bootstrap";
import CustomerHeader from "../components/customer/CustomerHeader";
import { CustomerContext } from "../customHooks/CustomerContext";
import ShowOwnerDetails from "../components/customer/ShowOwnerDetails";

const Property = () => {
  const [property, setProperty] = useState(null);
  const [address, setAddress] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const { customerState } = useContext(CustomerContext);
  const [showOwnerShow, setShowOwnerShow] = useState(false);
  const [owner, setOwner] = useState("");

  const findProperty = async () => {
    const url = `/property/${id}`;
    const successCode = 200;

    const [response, error] = await getRequest(url, successCode);
    if (response !== null) {
      setProperty(response["data"]["property"]);
      setAddress(response["data"]["property"].address);
    }
    if (error !== null) {
      navigate("/");
    }
  };

  const updatePackage = async (customerId) => {
    let url = `/customer/update/package/${customerId}`;
    console.log(url);
    const [response, err] = await postRequest({}, url, 202);
    console.log(response);
    console.log(err);
    if (response !== null) {
      return true;
    }
    if (err !== null) {
      return false;
    }
  };

  const getOwnerByPropertyId = async () => {
    let url = `http://localhost:8080/owner/${id}`;
    const [response, err] = await getRequest(url, 200);
    if (response !== null) {
      setOwner(response["data"]["owner"]);
      setShowOwnerShow(true);
    }
  };

  const getOwnerDetails = async () => {
    if (customerState === null || customerState["customer"] === null) {
      alert("please signin first");
      return;
    }
    const customerId = customerState["customer"]["id"];
    let url = `/customer/get/package/${customerId}`;
    const [response, err] = await getRequest(url, 200);
    if (response !== null) {
      if (response["data"]["package"]["remainingView"] <= 0) {
        alert("buy a new package you don't have any views left");
      } else {
        updatePackage(customerId);
        getOwnerByPropertyId();
      }
    }
    if (err !== null) {
      alert("you don't have any package buy a new one");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await findProperty();
    };

    fetchData();
  }, []);

  return (
    <div>
      <CustomerHeader />
      <div className="container">
        {property !== null && address !== null ? (
          <div>
            <Card.Title className="list-group-item p-2 border mb-2">
              <div className="row fs-6 text-center">
                <div className="col-md-6 col-12 border-end">
                  <span>{property.shortDescription}</span>
                  <br />
                  <span className="text-body-tertiary">{`${address.houseNumber}, ${address.street}, ${address.locality}, ${address.landmark}, ${address.city}`}</span>
                </div>
                <div className="col-md-2 col-6 border-end">
                  {"\u20B9 " + property.rent}
                  <br />
                  <span className="text-body-tertiary">Rent</span>
                </div>
                <div className="col-md-2 col-6 border-end">
                  {property.deposit} <br />
                  <span className="text-body-tertiary">Deposit</span>
                </div>
                <div className="col-md-2 col-6">
                  {property.areaSqFt} sqft. <br />
                  <span className="text-body-tertiary">Area</span>
                </div>
              </div>
            </Card.Title>
            <div className="row">
              <div className="col-md-6">
                <div>
                  <Carousel data-bs-theme="dark">
                    <Carousel.Item>
                      <img
                        className="d-block w-100 img-fluid overflow-hidden" // Fix the class name here
                        style={{ maxHeight: "400px" }} // Set a max height to contain the image
                        src="https://images.pexels.com/photos/17986565/pexels-photo-17986565/free-photo-of-man-sitting-on-a-chair-on-a-beach-playing-his-guitar.png"
                        alt="First slide"
                      />
                      <Carousel.Caption>
                        {/* <h5>First slide label</h5>
                        <p>
                          Nulla vitae elit libero, a pharetra augue mollis
                          interdum.
                        </p> */}
                      </Carousel.Caption>
                    </Carousel.Item>
                  </Carousel>
                </div>
              </div>
              <div className="col-md-6 border">
                <div style={{ height: "400px" }}>
                  <div className="card-body d-flex flex-column justify-content-between h-100">
                    <div>
                      <div className="row border">
                        <div className="col-md-6 border d-flex align-items-center justify-content-center p-2">
                          <div className="item">
                            <span className="text-body-secondary">
                              No. Of Bedroom: {property.bedroom}
                            </span>
                          </div>
                        </div>
                        <div className="col-md-6 border d-flex align-items-center justify-content-center p-2">
                          <div className="item">
                            <span className="text-body-secondary">
                              {property.furnishingStatus
                                ? "Furnishing Status: Furnished"
                                : "Furnishing Status: Unfurnished"}
                            </span>
                          </div>
                        </div>
                        <div className="col-md-6 border d-flex align-items-center justify-content-center p-2">
                          <div className="item">
                            <span className="text-body-secondary">
                              {property.gatedSecurity
                                ? "Gated Security: Available"
                                : "Gated Security: Unavailable"}
                            </span>
                          </div>
                        </div>
                        <div className="col-md-6 border d-flex align-items-center justify-content-center p-2">
                          <div className="item">
                            <span className="text-body-secondary">
                              {`Flat on ${property.floor} Floor`}
                            </span>
                          </div>
                        </div>
                        <div className="col-md-6 border d-flex align-items-center justify-content-center p-2">
                          <div className="item">
                            <span className="text-body-secondary">
                              Parking :
                              {property.parking.map(
                                (vehicle) => ` ${vehicle},`
                              )}
                            </span>
                          </div>
                        </div>
                        <div className="col-md-6 border d-flex align-items-center justify-content-center p-2">
                          <div className="item">
                            <span className="text-body-secondary">
                              {`Bathroom: ${property.bathroom}`}
                            </span>
                          </div>
                        </div>
                        <div className="col-md-6 border d-flex align-items-center justify-content-center p-2">
                          <div className="item">
                            <span className="text-body-secondary">
                              {`Locality: ${address.locality}`}
                            </span>
                          </div>
                        </div>
                        <div className="col-md-6 border d-flex align-items-center justify-content-center p-2">
                          <div className="item">
                            <span className="text-body-secondary">
                              {`Street: ${address.street}`}
                            </span>
                          </div>
                        </div>
                        <div className="col-md-6 border d-flex align-items-center justify-content-center p-2">
                          <div className="item">
                            <span className="text-body-secondary">
                              {`City: ${address.city}`}
                            </span>
                          </div>
                        </div>
                        <div className="col-md-6 border d-flex align-items-center justify-content-center p-2">
                          <div className="item">
                            <span className="text-body-secondary">
                              {`State: ${address.state}`}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      className="btn btn-primary mb-4"
                      onClick={getOwnerDetails}
                    >
                      Get Owner Details
                    </button>
                    <ShowOwnerDetails
                      owner={owner}
                      showOwnerShow={showOwnerShow}
                      setShowOwnerShow={setShowOwnerShow}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Property;
