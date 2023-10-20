import React, { createContext, useReducer } from "react";

const OwnerContext = createContext();

const ownerReducer = (ownerState, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...ownerState, owner: action.payload };
    case "LOGOUT":
      return { ...ownerState, owner: null };
    default:
      return ownerState;
  }
};

const OwnerProvider = ({ children }) => {
  const [ownerState, dispatch] = useReducer(ownerReducer, { owner: null });
  return (
    <OwnerContext.Provider value={{ ownerState, dispatch }}>
      {children}
    </OwnerContext.Provider>
  );
};

export { OwnerContext, OwnerProvider };
