import React, { useState } from "react";

const AddProperty = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };
  return <div>AddProperty</div>;
};

export default AddProperty;
