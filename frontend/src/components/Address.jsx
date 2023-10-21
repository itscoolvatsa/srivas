import React from "react";

const Address = ({ address }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Address</h5>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="card-body">
            <ul className="list-group">
              <li className="list-group-item">Name: {address.name}</li>
            </ul>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card-body">
            <ul className="list-group">
              <li className="list-group-item">
                House No: {address.houseNumber}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="card-body">
            <ul className="list-group">
              <li className="list-group-item">Street: {address.street}</li>
            </ul>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card-body">
            <ul className="list-group">
              <li className="list-group-item">Locality: {address.locality}</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="card-body">
            <ul className="list-group">
              <li className="list-group-item">Landmark: {address.landmark}</li>
            </ul>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card-body">
            <ul className="list-group">
              <li className="list-group-item">City: {address.city}</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="card-body">
            <ul className="list-group">
              <li className="list-group-item">State: {address.state}</li>
            </ul>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card-body">
            <ul className="list-group">
              <li className="list-group-item">Pincode: {address.pincode}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Address;
