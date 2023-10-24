import { createContext, useReducer } from "react";

const CustomerContext = createContext();

const customerReducer = (customerState, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...customerState, customer: action.payload };
    case "LOGOUT":
      return { ...customerState, customer: null };
    default:
      return customerState;
  }
};

const CustomerProvider = ({ children }) => {
  const [customerState, dispatch] = useReducer(customerReducer, {
    customer: null,
  });
  return (
    <CustomerContext.Provider value={{ customerState, dispatch }}>
      {children}
    </CustomerContext.Provider>
  );
};

export { CustomerContext, CustomerProvider };
