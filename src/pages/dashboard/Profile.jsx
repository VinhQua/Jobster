import React from "react";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { FormRow } from "../../components";
const Profile = () => {
  const handleChange = () => {};

  return (
    <Wrapper>
      <form className="form">
        <h3>profile</h3>
        <div className="form-center">
          <FormRow type="text" name="name" handleChange={handleChange} value={} />
        </div>
      </form>
    </Wrapper>
  );
};

export default Profile;
