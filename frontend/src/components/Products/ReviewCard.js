import { Rating } from "@material-ui/lab";
import React from "react";
import { useSelector } from "react-redux";
import profilePng from "../../images/Profile.png";

const ReviewCard = ({ review }) => {
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const options = {
    size: "small",
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <div className="reviewCard">
      {isAuthenticated === false ? (
        <img src={profilePng} alt="User" />
      ) : (
        <img src={user.avatar.url} alt={user.name} />
      )}

      <p>{review.name}</p>
      <Rating {...options} />
      <span className="reviewCardComment">{review.comment}</span>
    </div>
  );
};

export default ReviewCard;
