import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { login } from "../../services/auth";
import { useDispatch } from "react-redux";
import "./auth.css";
import { addUser } from "../../store/session";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

const LoginForm = ({ authenticated, setAuthenticated }) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

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

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div>
    <button onClick={onOpenModal}>Open modal</button>
    <Modal open={open} onClose={onCloseModal} center>
      <h2>Simple centered modal</h2>
    </Modal>
  </div>
    // <div className="container-background">
    //   <div className="loginForm-container">
    //     <form onSubmit={onLogin} className="login-form">
    //       <div>
    //         {errors.map((error) => (
    //           <div>{error}</div>
    //         ))}
    //       </div>
    //       <div className="login-title">Login to your account</div>
    //       <div>
    //         <label htmlFor="email">Email</label>
    //         <input
    //           name="email"
    //           type="text"
    //           placeholder="Email"
    //           value={email}
    //           onChange={updateEmail}
    //         />
    //       </div>
    //       <div>
    //         <label htmlFor="password">Password</label>
    //         <input
    //           name="password"
    //           type="password"
    //           placeholder="Password"
    //           value={password}
    //           onChange={updatePassword}
    //         />
    //       </div>
    //       <button type="submit">Login</button>
    //       <button type="submit" onClick={loginDemo}>
    //         demo
    //       </button>
    //     </form>
    //   </div>
    // </div>
  );
};

export default LoginForm;
