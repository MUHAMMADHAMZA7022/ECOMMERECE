import "./UpdateProfile.css";
import React, { Fragment, useState, useEffect } from "react";

import Loader from "../Layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { CLEAR_Errors, resetPassword } from "../../redux/action/useraction";
import { useAlert } from "react-alert";

const UpdatePassword = ({ history, match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [password, setPassword] = useState("");
  const [conformpassword, setConformPassword] = useState("");

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("password", password);
    myForm.set("conformpassword", conformpassword);

    dispatch(resetPassword(match.params.token, myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(CLEAR_Errors());
    }

    if (success) {
      alert.success("Password Updated Successfully");

      history.push("/login");
    }
  }, [dispatch, error, alert, history, success]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="updateProfileContainer">
            <div className="LoginSignUpBox">
              <h2 className="updateProfileHeading">Reset Password</h2>

              <form className="signinForm" onSubmit={resetPasswordSubmit}>
                <div className="group_field">
                  <label htmlFor="password">
                    New Password<span>*</span>
                  </label>
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                    onChange={(e) => setConformPassword(e.target.value)}
                  />
                </div>

                <div className="row group_field e_btn">
                  <button type="submit" value="Change">
                    RESET PASSWORD
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
