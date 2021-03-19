import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import "./NavBar.css";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ShopIcon from "@material-ui/icons/Shop";
import { useSelector } from "react-redux";
import { addUser } from "../../store/session";
import { authenticate } from "../../services/auth";

const ProfileButton = ({ authenticated, setAuthenticated }) => {
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((state) => state.session.user);

  console.log("authenticated status on profile btton", authenticated)

  const profileButtons = (
    <>
      {authenticated && (
        <>
          <div>
            <LogoutButton setAuthenticated={setAuthenticated} />
          </div>
          <div>
      
          </div>
        </>
      )}
      {!authenticated && (
        <>
          <div>
            <NavLink to="/login" exact={true} activeClassName="active">
              Login
            </NavLink>
          </div>
          <div>
            <NavLink to="/sign-up" exact={true} activeClassName="active">
              Sign Up
            </NavLink>
          </div>
        </>
      )}
    </>
  );

  return (
    <>
      <div className="button-container">
        <NavLink to="/ShoppingCart">
          <ShopIcon fontSize="large" />
        </NavLink>
        <button
          onClick={() => setShowMenu(showMenu === true ? false : true)}
          id="dropdown_button"
        >
          <AccountBoxIcon fontSize="large" />
        </button>

        {showMenu && profileButtons}
      </div>
    </>
  );
};

export default ProfileButton;
