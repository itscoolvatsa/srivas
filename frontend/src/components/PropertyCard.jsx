import React from "react";
import { Card } from "react-bootstrap";

const PropertyCard = ({ property, owner, userType }) => {
  const {
    rent,
    deposit,
    areaSqFt,
    shortDescription,
    bedroom,
    furnishingStatus,
    gatedSecurity,
    floor,
    postedOn,
  } = property;
  const { houseNumber, street, locality, landmark, city } = property.address;
  return (
    <Card className="text-center rounded-0 mb-4">
      <Card.Header className="ps-5">
        <div className="text-start">
          <div>{shortDescription}</div>
          <div>
            {`${houseNumber}, ${street}, ${locality}, ${landmark}, ${city}`}
          </div>
        </div>
      </Card.Header>
      <Card.Body className="list-group list-group-flush pt-2">
        <Card.Title className="list-group-item">
          <div className="row fs-6">
            <div className="col-md-4 border-end">
              {"\u20B9 " + rent}
              <br />
              <span className="text-body-tertiary">Rent</span>
            </div>
            <div className="col-md-4 border-end">
              {deposit} <br />
              <span className="text-body-tertiary">Deposit</span>
            </div>
            <div className="col-md-4">
              {areaSqFt} sqft. <br />
              <span className="text-body-tertiary">Area</span>
            </div>
          </div>
        </Card.Title>
        <Card.Text className="list-group-item">
          <div className="card mb-3">
            <div className="row g-0">
              <div className="col-md-4 border-end d-flex align-items-center justify-content-center">
                <img
                  src="https://images.pexels.com/photos/17986565/pexels-photo-17986565/free-photo-of-man-sitting-on-a-chair-on-a-beach-playing-his-guitar.png"
                  className="img-fluid"
                  alt="..."
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    height: "200px",
                  }}
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">Details</h5>
                  <div className="row border">
                    <div className="col-md-6 border d-flex align-items-center justify-content-center p-2">
                      <div className="item ">
                        <span className="text-body-secondary">
                          No. Of Bedroom: {bedroom}
                        </span>
                      </div>
                    </div>
                    <div className="col-md-6 border d-flex align-items-center justify-content-center p-2">
                      <div className="item">
                        <span className="text-body-secondary">
                          {furnishingStatus
                            ? "Totally Furnished"
                            : "Unfurnished"}
                        </span>
                      </div>
                    </div>
                    <div className="col-md-6 border d-flex align-items-center justify-content-center p-2">
                      <div className="item">
                        <span className="text-body-secondary">
                          {gatedSecurity
                            ? "Gated Security is available"
                            : "Gated Security is Unavailable"}
                        </span>
                      </div>
                    </div>
                    <div className="col-md-6 border d-flex align-items-center justify-content-center p-2">
                      <div className="item">
                        <span className="text-body-secondary">
                          {`Flat on ${floor} Floor`}
                        </span>
                      </div>
                    </div>
                  </div>
                  {userType ? (
                    <>
                      <button className="btn btn-primary align-self-end mt-3 me-3">
                        View Property
                      </button>
                      <button className="btn btn-primary align-self-end mt-3 ms-3">
                        Update Property
                      </button>
                    </>
                  ) : (
                    <button className="btn btn-primary align-self-end mt-3">
                      View Property
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">
        {new Date(postedOn).toLocaleString()}
      </Card.Footer>
    </Card>
  );
};

export default PropertyCard;
