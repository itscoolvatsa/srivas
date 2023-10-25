import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Owner from "./pages/owner/Owner";
import { OwnerProvider } from "./customHooks/OwnerContext";
import { CustomerProvider } from "./customHooks/CustomerContext";
import Dashboard from "./pages/owner/Dashboard";
import Properties from "./pages/owner/Properties";
import Home from "./pages/Home";
import Property from "./pages/Property";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <BrowserRouter>
      <OwnerProvider>
        <Routes>
          <Route path="/owner" element={<Owner />} />
          <Route path="/owner/dashboard/:id" element={<Dashboard />} />
          <Route path="/owner/property/:id" element={<Properties />} />
          <Route path="/owner/*" element={<Navigate to="/owner" />} />
        </Routes>
      </OwnerProvider>
      <CustomerProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/property/:id" element={<Property />} />
          <Route path="/customer/profile/:id" element={<Profile />} />
          <Route path="/customer/*" element={<Home />} />
        </Routes>
      </CustomerProvider>
    </BrowserRouter>
  );
};

export default App;
