import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

import "../../styles/tattoo-styles-priv.css";

import { RiHeartFill, RiDislikeFill } from "react-icons/ri";

import { Review } from "../component/user-reviews";

export const StylesPrivate = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const params = useParams();

  const [like, setLike] = useState(0);
  const [dislike, setDislike] = useState(0);

  const [likeActive, setLikeActive] = useState(false);
  const [dislikeActive, setDislikeActive] = useState(false);

  const likes = () => {
    if (likeActive) {
      setLikeActive(false);
      setLike(like - 1);
    } else {
      setLikeActive(true);
      setLike(like + 1);
      if (dislikeActive) {
        setDislikeActive(false);
        setLike(like + 1);
        setDislike(dislike - 1);
      }
    }
  };

  const dislikes = () => {
    if (dislikeActive) {
      setDislikeActive(false);
      setDislike(dislike - 1);
    } else {
      setDislikeActive(true);
      setDislike(dislike + 1);
      if (likeActive) {
        setLikeActive(false);
        setDislike(dislike + 1);
        setLike(like - 1);
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    actions.loadSingleStyle(params.id);
  }, []);

  return (
    <>
      <div className="private-title">
        <h1>learn more...</h1>
      </div>
      <div className="private-container">
        <div className="private-card" key={store.privateStyle.id}>
          <div className="private-img">
            <img src={store.privateStyle.image} alt="style-img" />
          </div>
          <div className="private-info">
            <h3 className="private-style-intro">
              What makes{" "}
              <span className="text-primary">"{store.privateStyle.style}"</span>{" "}
              style special?
            </h3>
            <p className="private-style-info">
              {store.privateStyle.information}
            </p>
            <div className="like-dislike">
              <button className="private-fav" onClick={likes}><RiHeartFill className ="fav-icon"/>Love {like}</button>
              <button className="private-fav" onClick={dislikes}><RiDislikeFill className ="fav-icon"/>Hate {dislike}</button>
            </div>
            <div className="go-back">
              <button onClick={() => navigate("/styles")}> ⇦ GO BACK </button>
            </div>
          </div>
        </div>
      </div>
      {/*       <Review /> */}
    </>
  );
};
