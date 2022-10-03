import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

import "../../styles/signup-signin.css";

import { FaEye, FaEyeSlash } from "react-icons/fa";

import { GoogleAuth } from "../component/google-auth";

export const SignIn = () => {
  const { actions, store } = useContext(Context);
  const navigate = useNavigate();

  const [show, setShow] = useState(true);

  const toggleBtn = () => {
    setShow((prevState) => !prevState);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div className="register">
      <div className="login-container">
        <div className="signin">
          <h1 className="fw-bold">Sign In</h1>
          {store.token && store.token != "" && store.token != undefined ? (
            "You are logged in with this token" + store.token
          ) : (
            <form onSubmit={(e) => actions.login(e, navigate)}>
              <div className="social">
                <GoogleAuth />
              </div>
              <p>Or enter your info</p>
              <div className="form-floating">
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  className="form-control floatingInput"
                  autoComplete="off"
                  value={store.currentUser?.email}
                  onChange={(e) => actions.handleChange(e)}
                />
                <label className="floatingInput">Email</label>
              </div>
              <div className="form-floating d-flex">
                <input
                  type={!show ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  className="form-control floatingPassword"
                  autoComplete="off"
                  value={store.currentUser?.password}
                  onChange={(e) => actions.handleChange(e)}
                />
                <label className="floatingPassword mt-2">Password </label>
                <div
                  className="form-control icon-eye show-password mt-2"
                  onClick={toggleBtn}
                >
                  {show ? (
                    <FaEyeSlash className="fa-2x svg" />
                  ) : (
                    <FaEye className="fa-2x svg" />
                  )}
                </div>
              </div>
              <div className="forgot">
                <Link to="/forgot-password" className="small">
                  <small>Forgot Password?</small>
                </Link>
              </div>
              <input type="submit" value="Sign In" />
              <small>
                Don't have an account?{" "}
                <Link to="/sign-up">
                  <label>Sign Up</label>
                </Link>
              </small>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
