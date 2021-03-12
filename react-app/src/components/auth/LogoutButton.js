import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { logout } from "../../services/auth";
import { logoutUser } from "../../store/session";

const LogoutButton = ({ setAuthenticated }) => {
  const dispatch = useDispatch();
  const onLogout = async (e) => {
    await logout();
    setAuthenticated(false);
    dispatch(logoutUser());
  };

  return (
    <>
      <button onClick={onLogout}>Logout</button>
    </>
  );
};

export default LogoutButton;
