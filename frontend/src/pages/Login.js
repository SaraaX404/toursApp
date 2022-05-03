import React, { useState, useEffect, useRef } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCardFooter,
  MDBValidation,
  MDBBtn,
  MDBIcon,
  MDBSpinner,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { googleSignIn, login } from "../redux/features/authSlice";
import { GoogleLogin } from "react-google-login";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { email, password } = formValue;
  const { loading, error } = useSelector((state) => ({ ...state.auth }));
  console.log(loading);
  console.log(error);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const googleSuccess = (res) => {
    const email = res?.profileObj?.email;
    const name = res?.profileObj.name;
    const token = res?.tokenId;
    const googleId = res?.googleId;
    const result = { email, name, token, googleId };

    dispatch(googleSignIn({ result, toast, navigate }));
  };

  const googleFailure = (err) => {
    toast.error(err);
  };
  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      error && toast.error(error);
      //dispatch the action an pass the formvalues, navigate and toast as a object
      dispatch(login({ formValue, navigate, toast }));
    }
  };

  const onInputChange = (e) => {
    let { name, value } = e.target;
    //set values to the use state
    setFormValue({ ...formValue, [name]: value });
  };
  console.log(formValue);
  return (
    <div
      style={{
        padding: "15px",
        maxWidth: "450px",
        alignContent: "center",
        margin: "120px",
      }}
    >
      <MDBCard alignment="center">
        <MDBIcon fas icon="user-circle" className="fa-2x" />
        <h5>Sign-In</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
            <div className="col-md-12">
              <MDBInput
                label="Email"
                type="email"
                value={email}
                name="email"
                onChange={onInputChange}
                required
                invalid
                validation="please provide your email"
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                label="Password"
                type="password"
                value={password}
                name="password"
                onChange={onInputChange}
                required
                invalid
                validation="please provide your password"
              />
            </div>
            <div className="col-md-12">
              <MDBBtn style={{ width: "100%" }} className="mt-2">
                Login
              </MDBBtn>
            </div>
          </MDBValidation>
          <br />
          <GoogleLogin
            clientId="147489918629-m67f6feed63b0u9b228mu3mm8qg6dft9.apps.googleusercontent.com"
            render={(renderProps) => (
              <MDBBtn
                style={{ width: "100%" }}
                color="danger"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <MDBIcon className="me-2" fab icon="google" /> Google Sign In
              </MDBBtn>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
        </MDBCardBody>
        {loading && (
          <MDBSpinner size="sm" role="status" tag="span" className="me-2" />
        )}
        <MDBCardFooter>
          <Link to="/register">
            <p>Don't have a account ? Sign Up</p>
          </Link>
        </MDBCardFooter>
      </MDBCard>
    </div>
  );
};

export default Login;
