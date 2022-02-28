import React, { Fragment, useEffect, useState } from "react";
import "./UpdateProfile.css";
import Loader from "../Layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  CLEAR_Errors,
  updateProfile,
  loadUser,
} from "../../redux/action/useraction";
import { useAlert } from "react-alert";
import { UPDATE_PROFILE_RESET } from "../../redux/constant/userconstant";
import { useHistory } from "react-router-dom";

const UpdateProfile = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    dispatch(updateProfile(myForm));
  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }

    if (error) {
      alert.error(error);
      dispatch(CLEAR_Errors());
    }

    if (isUpdated) {
      alert.success("Profile Updated Successfully");
      dispatch(loadUser());

      history.push("/accounts");

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, alert, history, user, isUpdated]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="updateProfileContainer">
            <div className="LoginSignUpBox">
              <h2 className="updateProfileHeading">Update Profile</h2>

              <form
                className="signinForm"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="group_field">
                  <label htmlFor="name">
                    Name<span>*</span>
                  </label>

                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="group_field">
                  <label htmlFor="name">
                    Email<span>*</span>
                  </label>

                  <input
                    type="email"
                    placeholder="Name"
                    required
                    name="name"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="group_field ">
                  <label htmlFor="name">
                    <img src={avatarPreview} alt="Avatar Preview" />
                  </label>
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                  />
                </div>

                <div className="row group_field e_btn">
                  <button type="submit" value="update">
                    UPDATE
                  </button>
                </div>
                {/* <input type="submit" value="Update" className="updateProfileBtn" /> */}
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdateProfile;
