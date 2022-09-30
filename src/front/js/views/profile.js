import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

import "../../styles/profile.css";

import { RiPhoneFill, RiInstagramLine, RiTwitterFill, RiFacebookFill } from "react-icons/ri";
import { VscMention } from "react-icons/vsc";
import { MdEmail } from "react-icons/md";
import { HiUserCircle } from "react-icons/hi";

import Notiflix, { Notify } from "notiflix";
import skull from "../../img/skull-profile.png";

export const Profile = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (store.currentUser === null) {
      navigate("/sign-in");
    } else {
      Notify.success(`Welcome back ${store.currentUser?.username}`, {
        width: "320px",
        distance: "60px",
        borderRadius: "6px",
        backOverlay: true,
        fontSize: "22px",
        cssAnimationStyle: "zoom",
        useFontAwesome: true,
        success: {
          background: "#a091ff",
          fontAwesomeClassName: "fas fa-hand-peace",
          backOverlayColor: "rgb(160, 145, 255, 0.2)",
        },
      });
    }
  }, []);

  return (
    <div className="form">
      <div className="pricing-title">
        <h1>Profile</h1>
      </div>
      <div className="row gutters-sm">
        <div className="col-md-4 mb-3">
          <div className="profile-card">
            <div className="profile-card-body">
              <div className="d-flex flex-column align-items-center text-center img-size">
                <img
                  src={store.picture == "" ? skull : store.picture}
                  alt="default-pic"
                  className="rounded-circle"
                />
                <div className="profile-btn">
                  <form onSubmit={(e) => actions.uploadPicture(e)}>
                    <input
                      type="file"
                      id="files"
                      className="hidden"
                      onChange={(e) => {
                        actions.handlePicture(e);
                      }}
                    />
                    <label htmlFor="files">Update</label>
                    <input type="submit" value="Submit" />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-8 profile-card">
          <form onSubmit={(e) => actions.loadProfile(e)}>
            <div className="form_box_input_first">
              <label htmlFor="username">Username</label>
              <div className="form_box_input_box">
                <div className="form_box_input_box_icon">
                  <VscMention />
                </div>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => actions.handleChange(e)}
                  defaultValue={store.currentUser?.username}
                  name="username"
                />
              </div>
            </div>
            <div className="form_box_input">
              <label htmlFor="name">Name</label>
              <div className="form_box_input_box">
                <div className="form_box_input_box_icon">
                  <HiUserCircle />
                </div>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => actions.handleChange(e)}
                  defaultValue={store.currentUser?.name}
                  name="name"
                />
              </div>
            </div>
            <div className="form_box_input">
              <label htmlFor="lastName">Last Name</label>
              <div className="form_box_input_box">
                <div className="form_box_input_box_icon">
                  <HiUserCircle />
                </div>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => actions.handleChange(e)}
                  defaultValue={store.currentUser?.lastname}
                  name="lastname"
                />
              </div>
            </div>
            <div className="form_box_input">
              <label htmlFor="phoneNumber">Phone Number</label>
              <div className="form_box_input_box">
                <div className="form_box_input_box_icon">
                  <RiPhoneFill />
                </div>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => actions.handleChange(e)}
                  defaultValue={store.currentUser?.phonenumber}
                  name="phonenumber"
                />
              </div>
            </div>
            <div className="form_box_input">
              <label htmlFor="email">Email</label>
              <div className="form_box_input_box">
                <div className="form_box_input_box_icon">
                  <MdEmail />
                </div>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => actions.handleChange(e)}
                  defaultValue={store.currentUser?.email}
                  name="email"
                />
              </div>
            </div>
            <div className="form_box_input_social">
              <div className="form_box_input">
                <label htmlFor="facebook">Facebook</label>
                <div className="form_box_input_box">
                  <div className="form_box_input_box_icon">
                    <RiFacebookFill />
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => actions.handleChange(e)}
                    defaultValue={store.currentUser?.facebook}
                    name="facebook"
                  />
                </div>
              </div>
              <div className="form_box_input">
                <label htmlFor="Twitter">Twitter</label>
                <div className="form_box_input_box">
                  <div className="form_box_input_box_icon">
                    <RiTwitterFill />
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => actions.handleChange(e)}
                    defaultValue={store.currentUser?.twitter}
                    name="twitter"
                  />
                </div>
              </div>
              <div className="form_box_input">
                <label htmlFor="Instagram">Instagram</label>
                <div className="form_box_input_box">
                  <div className="form_box_input_box_icon">
                    <RiInstagramLine />
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => actions.handleChange(e)}
                    defaultValue={store.currentUser?.instagram}
                    name="instagram"
                  />
                </div>
              </div>
            </div>
            <div className="update-profile-btn">
              <input type="submit" value="Save changes" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
