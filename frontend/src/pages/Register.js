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
import { register } from "../redux/features/authSlice";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  conformPassword: "",
};

const Login = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { email, password, firstName, lastName, conformPassword } = formValue;
  const { loading, error } = useSelector((state) => ({ ...state.auth }));
  console.log(loading);
  console.log(error.message);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    error && toast.error(error.message);
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== conformPassword) {
      return toast.error("passwords should match");
    }
    //dispatch the action an pass the formvalues, navigate and toast as a object
    if (email && password && firstName && lastName)
      dispatch(register({ formValue, navigate, toast }));
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
        margin: "auto",
        padding: "15px",
        maxWidth: "450px",
        alignContent: "center",
        margin: "120px",
      }}
    >
      <MDBCard alignment="center">
        <MDBIcon fas icon="user-circle" className="fa-2x" />
        <h5>Register</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
            <div className="col-md-6">
              <MDBInput
                label="Fisrt Name"
                type="text"
                value={firstName}
                name="firstName"
                onChange={onInputChange}
                required
                invalid
                validation="please provide your first name"
              />
            </div>
            <div className="col-md-6">
              <MDBInput
                label="Last Name"
                type="text"
                value={lastName}
                name="lastName"
                onChange={onInputChange}
                required
                invalid
                validation="please provide your last name"
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                label="Email"
                type="email"
                value={email}
                name="email"
                onChange={onInputChange}
                required
                invalid
                validation="please provide the email"
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
            <div className="md-col-12">
              <MDBInput
                label="Password Conform"
                type="password"
                value={conformPassword}
                name="conformPassword"
                onChange={onInputChange}
                required
                invalid
                validation="please provide conform the password"
              />
            </div>

            <MDBBtn style={{ width: "100%" }} className="mt-2">
              Register
            </MDBBtn>
          </MDBValidation>
        </MDBCardBody>
        {loading && (
          <MDBSpinner size="sm" role="status" tag="span" className="me-2" />
        )}
        <MDBCardFooter>
          <Link to="/login">
            <p>Alredy have an account? login</p>
          </Link>
        </MDBCardFooter>
      </MDBCard>
    </div>
  );
};

export default Login;
