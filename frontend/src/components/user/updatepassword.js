import "./UpdateProfile.css";
import React, { Fragment, useState, useEffect } from "react";

import Loader from "../Layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { CLEAR_Errors, updatePassword } from "../../redux/action/useraction";
import { useAlert } from "react-alert";
import { UPDATE_PASSWORD_RESET } from "../../redux/constant/userconstant";
import { useHistory } from "react-router-dom";
const UpdatePassword = () => {
  let history = useHistory();

  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [oldpassword, setOldPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [conformpassword, setConfirmPassword] = useState("");

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("oldpassword", oldpassword);
    myForm.set("newpassword", newpassword);
    myForm.set("conformpassword", conformpassword);

    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(CLEAR_Errors());
    }
    if (isUpdated) {
      alert.success("Password Updated Successfully");
      history.push("/accounts");

      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, alert, history, isUpdated]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="updateProfileContainer">
            <div className="LoginSignUpBox">
              <h2 className="updateProfileHeading">Update Password</h2>

              <form className="signinForm" onSubmit={updatePasswordSubmit}>
                <div className="group_field">
                  <label htmlFor="password">
                    Old Password<span>*</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Old Password"
                    required
                    value={oldpassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>
                <div className="group_field">
                  <label htmlFor="password">
                    New Password<span>*</span>
                  </label>
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={newpassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="group_field">
                  <label htmlFor="password">
                    Conform Password<span>*</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Conform Password"
                    required
                    value={conformpassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                <div className="row group_field e_btn">
                  <button type="submit" value="Change">
                    UPDATE
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdatePassword;
