import React, { Fragment, useState, useEffect } from "react";
import "./UpdateProfile.css";
import Loader from "../Layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { CLEAR_Errors, forgotPassword } from "../../redux/action/useraction";
import { useAlert } from "react-alert";
const UpdateProfile = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [email, setEmail] = useState("");

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("email", email);
    dispatch(forgotPassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(CLEAR_Errors());
    }

    if (message) {
      alert.success(message);
    }
  }, [dispatch, error, alert, message]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="updateProfileContainer">
            <div className="LoginSignUpBox">
              <h2 className="updateProfileHeading">Forgot Password</h2>

              <form className="signinForm" onSubmit={forgotPasswordSubmit}>
                <div className="group_field">
                  <label htmlFor="name">
                    Email<span>*</span>
                  </label>

                  <input
                    type="email"
                    placeholder="Enter Your Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="row group_field e_btn">
                  <button type="submit" value="Send">
                    Verify your email
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
