import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { GrInstagram, GrTwitter } from "react-icons/gr";
import { FaFacebookF, FaEye, FaEyeSlash } from "react-icons/fa";

import "../../styles/signUp.css";

export const SignUp = () => {
  const { actions, store } = useContext(Context);
  const navigate = useNavigate();

  const [show, setShow] = useState(true);
  const [show2, setShow2] = useState(true);

  const toggleBtn = () => {
    setShow((prevState) => !prevState);
  };

  const toggle2Btn = () => {
    setShow2((prevState) => !prevState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleClick = async () => {
    await actions.signup(store.username, store.email, store.password, store.confirmPassword).then(() => {
      store.message;
      navigate("/sign-in"); 

    })
  };

  return (
    <div className="register">
      <div className="login-container">
        <div className="sign-up">
          <h1 className="fw-bold">Create an account</h1>
          <form onSubmit={handleSubmit}>
            <div className="social">
              <a href="#" className="social-instagram">
                <GrInstagram className="gr" />
              </a>
              <a href="#" className="social-twitter">
                <GrTwitter className="gr" />
              </a>
              <a href="#" className="social-facebook">
                <FaFacebookF className="gr" />
              </a>
            </div>
            <p>Or enter your info</p>
            <div className="form-floating">
              <input
                type="text"
                placeholder="User Name"
                name="username"
                className="form-control"
                id="floatingInput"
                autoComplete="off"
                value={store.username}
                onChange={e => actions.handleChange(e)}
              />
              <label className="floatingInput">User Name</label>
            </div>
            <div className="form-floating">
              <input
                type="email"
                placeholder="Email"
                name="email"
                className="form-control"
                id="floatingInput"
                autoComplete="off"
                value={store.email}
                onChange={e => actions.handleChange(e)}
              />
              <label className="floatingInput">Email</label>
            </div>
            <div className="form-floating">
              <input
                type={!show ? "text" : "password"}
                placeholder="Password"
                name="password"
                className="form-control"
                id="floatingPassword"
                autoComplete="off"
                value={store.password}
                onChange={e => actions.handleChange(e)}
              />
              <label className="floatingPassword">Password</label>
              <div
                className="form-control icon-eye show-password2 mt-2"
                onClick={toggleBtn}
              >
                {show ? (
                  <FaEyeSlash className="fa-2x svg" />
                ) : (
                  <FaEye className="fa-2x svg" />
                )}
              </div>
            </div>
            <div className="form-floating">
              <input
                type={!show2 ? "text" : "password"}
                placeholder="Confirm Password"
                name="confirmPassword"
                className="form-control"
                id="floatingPassword"
                autoComplete="off"
                value={store.confirmPassword}
                onChange={e => actions.handleChange(e)}
              />
              <label id="floatingPassword">Confirm Password</label>
              <div
                className="form-control icon-eye show-password2 mt-2"
                onClick={toggle2Btn}
              >
                {show2 ? (
                  <FaEyeSlash className="fa-2x svg" />
                ) : (
                  <FaEye className="fa-2x svg" />
                )}
              </div>
            </div>
            <div className="sign-up-btn">
              <input onClick={handleClick} type="submit" value="Create Account" />
            </div>
            <small>
              Already have an account? <Link to="/sign-in">Sign In</Link>
            </small>
          </form>
        </div>
      </div>
    </div>
  );
};