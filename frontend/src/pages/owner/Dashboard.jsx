import React, { useContext, useEffect, useState } from "react";
import { OwnerContext } from "../../customHooks/OwnerContext";
import { useNavigate, useParams } from "react-router-dom";
import OwnerHeader from "../../components/owner/OwnerHeader";
import { getRequest } from "../../customHooks/axios";
import Address from "../../components/Address";
import AddressUpdate from "../../components/AddressUpdate";

const Dashboard = () => {
  const { ownerState } = useContext(OwnerContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [owner, setOwner] = useState(null);
  const [address, setAddress] = useState(null);
  const [show, setShow] = useState(false);
  const [addressUpdate, setAddressUpdate] = useState(false);

  const findAddress = async (id) => {
    let url = `/owner/address/get/${id}`;
    let successCode = 200;
    const [response, err] = await getRequest(url, successCode);
    if (response !== null) {
      setAddress(response["data"]["address"]);
    }
    if (err !== null) {
      setAddress(null);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (ownerState == null || ownerState["owner"] == null) {
        navigate(`/owner`);
      } else {
        setOwner(ownerState["owner"]);
        await findAddress(id);
      }
    };

    fetchData();
  }, [ownerState, navigate, id]);

  useEffect(() => {
    const fetchData = async () => {
      if (addressUpdate) {
        await findAddress(id);
      }
    };

    fetchData();
    setAddressUpdate(false);
  }, [addressUpdate]);

  const openUpdateDialog = () => {
    setShow(true);
  };

  return (
    <section>
      <OwnerHeader active={"profile"} />
      <div className="card text-center">
        <div className="card-header">
          Hello, {owner !== null && owner.name !== null ? owner["name"] : ""}
        </div>
        <div className="card-body">
          <h5 className="card-title">Profile</h5>

          {address !== null ? (
            <Address address={address} />
          ) : (
            <p className="card-text">No address available</p>
          )}
          <div className="mt-4">
            <button onClick={openUpdateDialog} className="btn btn-primary">
              Update Address
            </button>
          </div>
        </div>
      </div>
      {
        <AddressUpdate
          show={show}
          setShow={setShow}
          id={id}
          addressUpdate={addressUpdate}
          setAddressUpdate={setAddressUpdate}
        />
      }
    </section>
  );
};

export default Dashboard;
