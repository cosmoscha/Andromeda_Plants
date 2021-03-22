import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import { login } from "../../services/auth";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ShopIcon from "@material-ui/icons/Shop";
import { useSelector } from "react-redux";
import { addUser } from "../../store/session";
import { authenticate } from "../../services/auth";
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import "./NavBar.css";

const ProfileButton = ({ authenticated, setAuthenticated }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  console.log("authenticated status on profile btton", authenticated)


  const onLogin = async (e) => {
    e.preventDefault();
    const user = await login(email, password);
    if (!user.errors) {
      setAuthenticated(true);
      dispatch(addUser(user));
    } else {
      setErrors(user.errors);
    }
  };

  const loginDemo = async (e) => {
    e.preventDefault();
    const user = await login("demo@aa.io", "password");
    if (!user.errors) {
      setAuthenticated(true);
      dispatch(addUser(user));
    } else {
      setErrors(user.errors);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

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
            <button onClick={onOpenModal}>login or signup</button>
            <Modal open={open} onClose={onCloseModal} center>
                <div className="container-background">
                    <div className="loginForm-container">
                      <form onSubmit={onLogin} className="login-form">
                        <div>
                          {errors.map((error) => (
                            <div>{error}</div>
                          ))}
                        </div>
                        <div className="login-title">Login to your account</div>
                        <div>
                          <label htmlFor="email">Email</label>
                          <input
                            name="email"
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={updateEmail}
                          />
                        </div>
                        <div>
                          <label htmlFor="password">Password</label>
                          <input
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={updatePassword}
                          />
                        </div>
                        <button type="submit">Login</button>
                        <button type="submit" onClick={loginDemo}>
                          demo
                        </button>
                      </form>
                    </div>
                  </div>
              </Modal>
          </div>
        </>
      )}
    </>
  );

  return (
    <>
        <NavLink to="/ShoppingCart">
          <ShopIcon fontSize="large" />
        </NavLink>
      <div className="button-container">
        <button
        className="profile-button"
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
