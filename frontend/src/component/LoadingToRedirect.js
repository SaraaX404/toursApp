import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoadingToRedirect = () => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();
  useEffect(() => {
    const intervel = setInterval(() => {
      setCount(count - 1);
    }, 1000);

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
