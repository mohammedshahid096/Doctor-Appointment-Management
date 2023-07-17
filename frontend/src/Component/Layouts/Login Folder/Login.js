import React, { useState, useEffect } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  LoginAction,
  userClearErrorsAction,
} from "../../../Actions/UserAction";
import { ToastError } from "../../AlertPops/Alertpop";
import Loader from "../../Loader/Loader";

const Login = () => {
  const dispatch = useDispatch();
  const { error, isAuthenticated, loading } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const LoginSubmit = (event) => {
    event.preventDefault();
    if ((!email, !password)) {
      ToastError("Enter all the fields");
      return;
    }
    dispatch(LoginAction(email, password));
  };

  useEffect(() => {
    if (error) {
      ToastError(error);
      dispatch(userClearErrorsAction());
    }
    if (isAuthenticated) {
      navigate("/");
    }
  }, [dispatch, error, isAuthenticated, navigate]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <section className="login-page">
            <div className="wrapper">
              <div className="loginContainer">
                <h1>login</h1>

                <form onSubmit={LoginSubmit}>
                  <div className="form-group">
                    <label htmlFor="email">Email :</label>
                    <input
                      type="email"
                      placeholder="example@gmail.com"
                      value={email}
                      onChange={(e) => setemail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">Password :</label>
                    <input
                      type="password"
                      placeholder="Enter the password"
                      value={password}
                      onChange={(e) => setpassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <button type="submit" className="loginbutton">
                      Sign In
                    </button>
                  </div>
                </form>

                <div className="form-group donthaveaccount">
                  <p>
                    Don't have an account ?<Link to="/signup">Sign up</Link>
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

export default Login;
