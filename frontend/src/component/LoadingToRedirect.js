import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoadingToRedirect = () => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {

    const intervel = setInterval(() => {
      //reduce count second by second
      setCount(count - 1);
    }, 1000);
    //in 5 seconds, count will be 0 and interval will be clear and redirect to the login page
    if (count === 0) {
      clearInterval(intervel);
      navigate("/login");
    }
  }, [count, navigate]);

  return (
    <div style={{ paddingTop: "100px" }}>
      Redirecting you in {count} seconds
    </div>
  );
};

export default LoadingToRedirect;
