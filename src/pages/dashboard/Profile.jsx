import React, { useState } from "react";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { FormRow } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateUser } from "../../features/users/userSlice";
const Profile = () => {
  const { user, isLoading } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    email: user?.email || "",
    lastName: user?.lastName || "",
    location: user?.location || "",
    name: user?.name || "",
  });
  const { email, lastName, location, name } = userData;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user || !lastName || !location || !name) {
      return toast.error("Please Fill In All Fields");
    }
    dispatch(updateUser(userData));
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
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
          <button type="submit" className="btn btn-block" disabled={isLoading}>
            {isLoading ? "Loading..." : "Save"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Profile;
