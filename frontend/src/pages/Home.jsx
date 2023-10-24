import React, { useEffect, useState } from "react";
import PropertyCard from "../components/PropertyCard";
import { getRequest } from "../customHooks/axios";

const Home = () => {
  const [properties, setProperties] = useState(null);

  const findProperties = async () => {
    const url = `/property`;
    const successCode = 200;

    const [response, error] = await getRequest(url, successCode);
    if (response != null) {
      setProperties(response["data"]["properties"]);
    }
  };

  useEffect(() => {
    findProperties();
  }, []);

  return (
    <div>
      {properties !== null
        ? properties.map((property, index) => (
            <PropertyCard key={index} property={property} userType={false} />
          ))
        : "No property listed"}
    </div>
  );
};

export default Home;
