import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import { login } from "../../services/auth";
import { signUp } from "../../services/auth";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ShopIcon from "@material-ui/icons/Shop";
import { CloudUploadOutlined } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { addUser } from "../../store/session";
import { authenticate } from "../../services/auth";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import "./NavBar.css";

import loginImg from "./pingpurple.jpg";

const ProfileButton = ({ authenticated, setAuthenticated }) => {
  const fileInput = useRef(null);
  const [showMenu, setShowMenu] = useState(false);
  const [open, setOpen] = useState(false);
  const [signedup, setSignedup] = useState(false);
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [profilePhotoFile, setProfilePhotoFile] = useState("");
  const [selectedFile, setSelectedFile] = useState("Profile Image");

  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => {
    setOpen(false);
    setSignedup(false);
  };

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

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const user = await signUp(username, email, password, profilePhotoFile);
      if (!user.errors) {
        setAuthenticated(true);
        dispatch(addUser(user));
      }
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

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateProfilePhotoFile = (e) => {
    setProfilePhotoFile(e.target.files[0]);
    if (!e.target.files.length) {
      setSelectedFile("Profile Image");
    } else {
      setSelectedFile(`${e.target.value.split("\\").pop()}`);
    }
  };

  const profileButtons = (
    <>
      {authenticated && (
        <>
          <div>
            <LogoutButton setAuthenticated={setAuthenticated} />
          </div>
          <div></div>
        </>
      )}
      {!authenticated && !signedup && (
        <>
          <div>
            <button onClick={onOpenModal}>
              <AccountBoxIcon fontSize="large" />
            </button>
            <Modal open={open} onClose={onCloseModal} center className="modal">
              <div className="container-background">
                <div className="loginForm-container">
                  <form onSubmit={onLogin} className="login-form">
                    <div>
                      {errors.map((error) => (
                        <div>{error}</div>
                      ))}
                    </div>
                    <img
                      src={loginImg}
                      style={{
                        width: "400px",
                        height: "300px",
                        border: "solid",
                        borderRadius: "40%",
                      }}
                    />
                    <div className="login-title">Login to your account</div>
                    <div className="login-inputs">
                      <div>
                        <input
                          name="email"
                          type="text"
                          placeholder="Email"
                          value={email}
                          onChange={updateEmail}
                          style={{ fontSize: "150%" }}
                        />
                      </div>
                      <div>
                        <input
                          name="password"
                          type="password"
                          placeholder="Password"
                          value={password}
                          onChange={updatePassword}
                          style={{ fontSize: "150%" }}
                        />
                      </div>
                    </div>
                    <div className="buttonContainers">
                      <button type="submit">Login</button>
                      <button type="submit" onClick={loginDemo}>
                        demo
                      </button>
                    </div>

                    <button
                      onClick={() => setSignedup(true)}
                      style={{
                        backgroundColor: "transparent",
                        outline: "none",
                        border: "none",
                        color: "white",
                        fontSize: "120%",
                      }}
                    >
                      don't have an account? signup today!
                    </button>
                  </form>
                </div>
              </div>
            </Modal>
          </div>
        </>
      )}

      {!authenticated && signedup && (
        <>
          <div>
            <button onClick={onOpenModal}>
              <AccountBoxIcon fontSize="large" />
            </button>
            <Modal open={open} onClose={onCloseModal} center>
              <div className="container-background">
                <div className="loginForm-container">
                  <form onSubmit={onSignUp} className="login-form">
                    <div className="login-title">Create an account</div>
                    <div className="signup-inputs">
                      <div>
                        <input
                          placeholder="Create a Username"
                          type="text"
                          name="username"
                          onChange={updateUsername}
                          value={username}
                        ></input>
                      </div>
                      <div>
                        <input
                          placeholder="Enter your Email"
                          type="text"
                          name="email"
                          onChange={updateEmail}
                          value={email}
                        ></input>
                      </div>
                      <div>
                        <input
                          placeholder="Create a password"
                          type="password"
                          name="password"
                          onChange={updatePassword}
                          value={password}
                        ></input>
                      </div>
                      <div>
                        <input
                          placeholder="Confirm your password"
                          type="password"
                          name="repeat_password"
                          onChange={updateRepeatPassword}
                          value={repeatPassword}
                          required={true}
                        ></input>
                      </div>
                    </div>

                    <div>
                      <div className="normalize-text file-input ">
                        <label
                          className="upload-button"
                          onClick={() => fileInput.current.click()}
                        >
                          <div
                            className="flex-container"
                            style={{
                              justifyContent: "center",
                              alignItems: "center",
                              margin: "0",
                              padding: "0 8px",
                            }}
                          >
                            <CloudUploadOutlined
                              style={{ marginRight: "12px", fontSize: "large" }}
                            />
                            <h5
                              className="normalize-text"
                              style={{ margin: "0", overflow: "hidden" }}
                            >
                              {selectedFile}
                            </h5>
                          </div>
                        </label>
                        <input
                          style={{ display: "none" }}
                          type="file"
                          name="user_file"
                          onChange={updateProfilePhotoFile}
                          ref={fileInput}
                          //  value={profilePhotoUrl}
                        />
                      </div>
                    </div>
                    <div className="buttonContainers2">
                      <button type="submit">Sign Up</button>
                      <button onClick={() => setSignedup(false)}>
                        {" "}
                        back to login
                      </button>
                    </div>
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
      <NavLink to="/ShoppingCart" className="shoppingCart">
        <ShopIcon fontSize="large" />
      </NavLink>
      <NavLink to="/Discussion">
        <div>discussion</div>
      </NavLink>
      {user && (
        <img
          src={user.profilePhotoUrl}
          style={{ width: "50px", height: "50px", borderRadius: "40%" }}
        />
      )}

      <div>{profileButtons}</div>
    </>
  );
};

export default ProfileButton;
