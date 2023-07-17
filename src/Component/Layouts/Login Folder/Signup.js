import React, { useEffect, useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  SignupAction,
  userClearErrorsAction,
} from "../../../Actions/UserAction";
import { ToastError } from "../../AlertPops/Alertpop";
import Loader from "../../Loader/Loader";

const Signup = () => {
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [signupDetails, setsignupDetails] = useState({
    username: "",
    email: "",
    password: "",
  });

  const onchangeSignup = (e) => {
    setsignupDetails({ ...signupDetails, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (error) {
      ToastError(error);
      dispatch(userClearErrorsAction());
    }
  }, [dispatch, error, navigate]);

  const SubmitRegister = (event) => {
    event.preventDefault();
    const RegisterFormData = new FormData();
    RegisterFormData.append("name", signupDetails.username);
    RegisterFormData.append("email", signupDetails.email);
    RegisterFormData.append("password", signupDetails.password);

    dispatch(SignupAction(RegisterFormData));
    navigate("/");
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <section
            className="login-page"
            style={{ backgroundPosition: "left" }}
          >
            <div className="wrapper2">
              <div></div>
              <div className="loginContainer">
                <h1>SignUp</h1>

                <form onSubmit={SubmitRegister}>
                  <div className="form-group">
                    <label htmlFor="name">Name : </label>
                    <input
                      type="text"
                      placeholder="Enter the name"
                      name="username"
                      value={signupDetails.name}
                      onChange={onchangeSignup}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email :</label>
                    <input
                      type="email"
                      placeholder="example@gmail.com"
                      name="email"
                      value={signupDetails.email}
                      onChange={onchangeSignup}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">Password :</label>
                    <input
                      type="password"
                      placeholder="Enter the password"
                      name="password"
                      value={signupDetails.password}
                      onChange={onchangeSignup}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <button type="submit" className="loginbutton">
                      Agree and continue
                    </button>
                  </div>
                </form>

                <div className="form-group donthaveaccount">
                  <p>
                    have an account ?<Link to="/">Login</Link>
                  </p>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Signup;
