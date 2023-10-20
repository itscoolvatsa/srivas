const signupFields = [
  {
    labelText: "Name",
    id: "name",
    name: "name",
    type: "text",
    autoComplete: "name",
    isRequired: true,
    placeholder: "Name",
  },
  {
    labelText: "Mobile Number",
    id: "mobile",
    name: "mobile",
    type: "mobile",
    autoComplete: "mobile",
    isRequired: true,
    placeholder: "Mobile",
  },
  {
    labelText: "Email address",

    id: "email",
    name: "email",
    type: "email",
    autoComplete: "email",
    isRequired: true,
    placeholder: "Email",
  },
  {
    labelText: "Password",

    id: "password",
    name: "password",
    type: "password",
    autoComplete: "password",
    isRequired: true,
    placeholder: "Password",
  },
  {
    labelText: "Confirm Password",
    id: "confirmPassword",
    name: "confirmPassword",
    type: "password",
    autoComplete: "confirmPassword",
    isRequired: true,
    placeholder: "Confirm Password",
  },
];

const loginFields = [
  {
    labelText: "Email address",
    id: "email",
    name: "email",
    type: "email",
    autoComplete: "email",
    isRequired: true,
    placeholder: "Email",
  },
  {
    labelText: "Password",
    id: "password",
    name: "password",
    type: "password",
    autoComplete: "password",
    isRequired: true,
    placeholder: "Password",
  },
];

export { loginFields, signupFields };
