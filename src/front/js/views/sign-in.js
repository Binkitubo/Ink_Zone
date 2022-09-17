import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { GrInstagram, GrTwitter } from "react-icons/gr";
import { FaFacebookF, FaEye, FaEyeSlash } from "react-icons/fa";

import "../../styles/signUp.css";

export const SignIn = () => {
  const { actions, store } = useContext(Context);

  const [show, setShow] = useState(true);

  const toggleBtn = () => {
    setShow((prevState) => !prevState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  console.log("This is your token", store.token)

  const handleClick = () => {
    actions.login(email, password);
  };

  if (store.token && store.token != "" && store.token != undefined) navigate("/");

  return (
    <div className="register">
      <div className="login-container">
        <div className="signin">
          <h1 className="fw-bold">Sign In</h1>
          {store.token && store.token != "" && store.token != undefined ? (
            "You are logged in with this token" + store.token
          ) : (
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
                  type="email"
                  placeholder="Email"
                  name="email"
                  className="form-control"
                  id="floatingInput"
                  autoComplete="off"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label className="floatingInput">Email</label>
              </div>
              <div className="form-floating d-flex">
                <input
                  type={!show ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  className="form-control"
                  id="floatingPassword"
                  autoComplete="off"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
              <input type="submit" value="Sign In" onClick={handleClick} />
              <small>
                Don't have an account? <Link to="/sign-up">Sign Up</Link>
              </small>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
