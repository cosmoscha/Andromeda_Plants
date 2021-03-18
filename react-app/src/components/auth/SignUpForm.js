import React, { useState, useRef } from "react";
import { Redirect } from "react-router-dom";
import { signUp } from "../../services/auth";
import "./auth.css";
import { CloudUploadOutlined } from "@material-ui/icons";
const SignUpForm = ({ authenticated, setAuthenticated }) => {
  const fileInput = useRef(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [profilePhotoFile, setProfilePhotoFile] = useState("");
  const [selectedFile, setSelectedFile] = useState("Profile Image");

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const user = await signUp(username, email, password, profilePhotoFile);
      if (!user.errors) {
        setAuthenticated(true);
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
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

  const updateProfilePhotoFile = (e) => {
    setProfilePhotoFile(e.target.files[0]);
    if (!e.target.files.length) {
      setSelectedFile("Profile Image");
    } else {
      setSelectedFile(`${e.target.value.split("\\").pop()}`);
    }
  };

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container-background">
      <div className="loginForm-container">
        <form onSubmit={onSignUp} className="login-form">
          <div className="login-title">Create an account</div>
          <div>
            <label>User Name:</label>
            <input
              type="text"
              name="username"
              onChange={updateUsername}
              value={username}
            ></input>
          </div>
          <div>
            <label>Email: </label>
            <input
              type="text"
              name="email"
              onChange={updateEmail}
              value={email}
            ></input>
          </div>
          <div>
            <label>Password: </label>
            <input
              type="password"
              name="password"
              onChange={updatePassword}
              value={password}
            ></input>
          </div>
          <div>
            <label>Repeat Password: </label>
            <input
              type="password"
              name="repeat_password"
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            ></input>
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
                  <CloudUploadOutlined style={{ marginRight: "12px" }} />
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
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
