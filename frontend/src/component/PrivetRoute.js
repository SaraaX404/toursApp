import React, { Children } from "react";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";
//in this logic if the user is logged in he can access the children component. if not he will redirect to the login page
const PrivetRoute = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state.auth }));
  return user ? children : <LoadingToRedirect />;
};

export default PrivetRoute;
