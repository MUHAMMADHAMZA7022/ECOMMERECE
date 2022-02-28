import React, { Fragment, useEffect, useRef, useState } from "react";
import "./loginsignup.css";
import { Link } from "react-router-dom";
import Loader from "./../Layout/Loader/Loader";
import { useSelector, useDispatch } from "react-redux";
import { CLEAR_Errors, login, register } from "../../redux/action/useraction";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import { GoogleLogin } from "react-google-login";
const LoginSignUp = ({ location }) => {
  let history = useHistory();
  // const dispatch = useDispatch();
  // const alert = useAlert();

  // const { error, loading, isAuthenticated } = useSelector(
  //   (state) => state.user
  // );

  // const loginTab = useRef(null);
  // const registerTab = useRef(null);
  // const switcherTab = useRef(null);

  // const [loginEmail, setLoginEmail] = useState("");
  // const [loginPassword, setLoginPassword] = useState("");

  // const [user, setUser] = useState({
  //   name: "",
  //   email: "",
  //   password: "",
  // });

  // const { name, email, password } = user;

  // const [avatar, setAvatar] = useState("/Profile.png");
  // const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  // const loginSubmit = (e) => {
  //   e.preventDefault();
  //   dispatch(login(loginEmail, loginPassword));
  // };

  // const registerSubmit = (e) => {
  //   e.preventDefault();

  //   const myForm = new FormData();

  //   myForm.set("name", name);
  //   myForm.set("email", email);
  //   myForm.set("password", password);
  //   myForm.set("avatar", avatar);
  //   dispatch(register(myForm));
  // };

  // const registerDataChange = (e) => {
  //   if (e.target.name === "avatar") {
  //     const reader = new FileReader();

  //     reader.onload = () => {
  //       if (reader.readyState === 2) {
  //         setAvatarPreview(reader.result);
  //         setAvatar(reader.result);
  //       }
  //     };

  //     reader.readAsDataURL(e.target.files[0]);
  //   } else {
  //     setUser({ ...user, [e.target.name]: e.target.value });
  //   }
  // };

  // useEffect(() => {
  //   if (error) {
  //     alert.error(error);
  //     dispatch(CLEAR_Errors());
  //   }
  // }, [dispatch, error, alert, history, isAuthenticated]);

  // const switchTabs = (e, tab) => {
  //   if (tab === "login") {
  //     switcherTab.current.classList.add("shiftToNeutral");
  //     switcherTab.current.classList.remove("shiftToRight");

  //     registerTab.current.classList.remove("shiftToNeutralForm");
  //     loginTab.current.classList.remove("shiftToLeft");
  //   }
  //   if (tab === "register") {
  //     switcherTab.current.classList.add("shiftToRight");
  //     switcherTab.current.classList.remove("shiftToNeutral");

  //     registerTab.current.classList.add("shiftToNeutralForm");
  //     loginTab.current.classList.add("shiftToLeft");
  //   }
  // };

  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const registerDataChange = (e) => {
    let name, value;
    name = e.target.name; //name get kiya
    value = e.target.value; //value mili user jo likh rha
    setUser({ ...user, [name]: value });
  };
  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };
  const registerSubmit = (e) => {
    e.preventDefault();
    let myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    dispatch(register(myForm));
  };
  // const redirect = location.search
  //   ? location.search.split("=")[1]
  //   : "/accounts";
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(CLEAR_Errors());
    }
    if (isAuthenticated) {
      history.push("/accounts");
    }
  }, [dispatch, error, alert, history, isAuthenticated]);

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="LoginSignUpContainer">
            <div className="LoginSignUpBox">
              <div className="login_signUp_toggle">
                <p className="login" onClick={(e) => switchTabs(e, "login")}>
                  LOGIN
                </p>
                <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
              </div>
              <button ref={switcherTab}></button>

              <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                <div className="group_field">
                  <label htmlFor="email">
                    Email<span>*</span>
                  </label>

                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div className="group_field">
                  {/* <LockOpenIcon /> */}
                  <label htmlFor="password">
                    Password<span>*</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <div className="row group_field e_btn">
                  <button type="submit" value="Login">
                    Sign In
                  </button>
                  <Link className="f_link" to="/forgot_password">
                    Forget Password?
                  </Link>
                </div>
                <div className="row group_field e_btn">
                  <h3>Or login with</h3>
                </div>
                <div className="social_login">
                  {/* For Google Login Authentication */}
                  <GoogleLogin
                    clientId="968709430379-dkv5gov48ieuc3t5kmq5s7in57sri6er.apps.googleusercontent.com"
                    buttonText="Login google"
                    // onSuccess={responseGoogle}
                    cookiePolicy={"single_host_origin"}
                  />
                  <GoogleLogin
                    clientId="968709430379-dkv5gov48ieuc3t5kmq5s7in57sri6er.apps.googleusercontent.com"
                    buttonText="Login Facebook"
                    // onSuccess={responseGoogle}
                    cookiePolicy={"single_host_origin"}
                  />
                  ,{/* For Facebbok Login Authentication */}
                  {/* <FacebookLogin
                    appId="452032583149631"
                    autoLoad={false}
                    fields="name,email,picture"
                    // callback={responseFacebook}
                  /> */}
                </div>
                <div className="group_field">
                  <p onClick={(e) => switchTabs(e, "register")}>
                    {" "}
                    New Customer? <Link>Register</Link>
                  </p>
                </div>
              </form>

              <form
                className="signUpForm"
                ref={registerTab}
                enctype="multipart/form-data"
                onSubmit={registerSubmit}
              >
                <div className="group_field">
                  <label htmlFor="name">
                    Name<span>*</span>
                  </label>
                  {/* <FaceIcon /> */}
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="group_field">
                  {/* <MailOutlineIcon /> */}
                  <label htmlFor="email">
                    Email<span>*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="group_field">
                  {/* <LockOpenIcon /> */}
                  <label htmlFor="password">
                    Password<span>*</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                  />
                </div>
                {/* <div className="group_field ">
                  <label htmlFor="name">
                    <img src="./Profile.png" alt="Avatar Preview" />
                  </label>
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div> */}

                <div className="row group_field e_btn">
                  <button type="submit" value="Register">
                    Register
                  </button>
                </div>

                <div className="group_field_log">
                  <p className="login" onClick={(e) => switchTabs(e, "login")}>
                    Already have an account?{" "}
                    <Link className="f_link" to="/login">
                      Login
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default LoginSignUp;
