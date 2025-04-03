import React from "react";
import { useDispatch } from "react-redux";
import TinderCard from "react-tinder-card";
import { removeFeed } from "../utils/feedSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

export const UserCard = ({ data, disableSwipe = false }) => {
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {} ,
        { withCredentials: true }
      );
      console.log(res);
      dispatch(removeFeed(userId)); // Remove the card after swipe
    } catch (err) {
      console.log(err);
    }
  };

  const onSwipe = (direction) => {
    if (!disableSwipe) {
      if (direction === "right") {
        handleSendRequest("interested", data._id);
      } else if (direction === "left") {
        handleSendRequest("ignored", data._id);
      }
    }
  };

  const { _id, firstName, lastName, photoUrl, about, age, gender } = data;

  const CardContent = (
    <div className="card bg-base-300 w-96 shadow-xl">
      <figure>
        <img src={photoUrl} alt="User" className="w-full h-80 object-cover" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {firstName} {lastName}
        </h2>
        <h2>
          {age} {gender}
        </h2>
        <p>{about}</p>
      </div>
    </div>
  );

  return disableSwipe ? (
    <div className="ml-10">{CardContent}</div> // Adjust margin to align beside form
  ) : (
    <TinderCard
      className="absolute"
      preventSwipe={["up", "down"]}
      onSwipe={onSwipe}
      key={_id}
    >
      {CardContent}
    </TinderCard>
  );
};

