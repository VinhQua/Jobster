import Wrapper from "../assets/wrappers/Navbar";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";
import Logo from "./Logo";
import { useDispatch, useSelector } from "react-redux";
import { clearStore, toggleSideBar } from "../features/users/userSlice";
import { useState } from "react";
const NavBar = () => {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <Wrapper>
      <div className="nav-center">
        <button
          type="button"
          className="toggle-btn"
          onClick={() => dispatch(toggleSideBar())}
        >
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className="logo-text">dashboard</h3>
        </div>
        <div className="btn-container">
          <button
            type="button"
            className="btn"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <FaUserCircle />
            {user?.name}
            <FaCaretDown />
          </button>

          <div className={showDropdown ? "dropdown show-dropdown" : "dropdown"}>
            <button
              type="button"
              className="dropdown-btn"
              onClick={() => dispatch(clearStore("Logging Out..."))}
            >
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default NavBar;
