import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Owner from "./pages/owner/Owner";
import { OwnerContext, OwnerProvider } from "./customHooks/OwnerContext";
import Dashboard from "./pages/owner/Dashboard";
import Properties from "./pages/owner/Properties";

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
    </BrowserRouter>
  );
};

export default App;
