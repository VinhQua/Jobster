import React, { useState } from "react";
const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};
const Register = () => {
  const [values, setValues] = useState(initialState);
  const handleChange = (e) => {
    console.log(e);
  };

  return <div>regise</div>;
};

export default Register;
