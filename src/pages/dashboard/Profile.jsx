import React, { useState } from "react";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { FormRow } from "../../components";
import { useSelector } from "react-redux";
const Profile = () => {
  const { user } = useSelector((store) => store.user);
  const [userData, setUserData] = useState({
    email: user?.email,
    lastName: user?.lastName,
    location: user?.location,
    name: user?.name,
  });
  const { email, lastName, location, name } = userData;
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <Wrapper>
      <form className="form">
        <h3>profile</h3>
        <div className="form-center">
          <FormRow
            type="text"
            name="name"
            handleChange={handleChange}
            value={name}
          />
          <FormRow
            type="text"
            name="lastName"
            labelText="Last Name"
            handleChange={handleChange}
            value={lastName}
          />
          <FormRow
            type="email"
            name="email"
            handleChange={handleChange}
            value={email}
          />
          <FormRow
            type="text"
            name="location"
            handleChange={handleChange}
            value={location}
          />
        </div>
      </form>
    </Wrapper>
  );
};

export default Profile;
