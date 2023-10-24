import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRequest } from "../customHooks/axios";
import { Card, Carousel } from "react-bootstrap";
import Header from "../components/Header";

const Property = () => {
  const [property, setProperty] = useState(null);
  const [address, setAddress] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

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

  const getOwnerDetails = () => {};

  useEffect(() => {
    const fetchData = async () => {
      await findProperty();
    };

    fetchData();
  }, []);

  return (
    <div>
      <Header />
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

// "data": {
//   "property": {
//       "id": "65360457e0168637d1110f9c",
//       "postedOn": "2023-10-16T00:00:00.000+00:00",
//       "description": "A beautiful apartmen",
//       "address": {
//           "id": "65360457e0168637d1110f9b",
//           "name": "John Doe 1",
//           "houseNumber": "12356 Main St",
//           "street": "Downtown Avenue",
//           "locality": "Central District",
//           "landmark": "City Park",
//           "city": "Big City",
//           "state": "CAali",
//           "pincode": "12345"
//       }
//   }
// },
