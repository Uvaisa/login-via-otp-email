import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const navigate = useNavigate();
  const Valid = () => {
    let token = localStorage.getItem("userdbToken");
    if (token) {
      console.log("valid User");
    } else {
      navigate("*");
    }
  };
  useEffect(() => {
    Valid();
  }, []);
  return (
    <div>
      <h1>dashboard</h1>
    </div>
  );
};

export default Dashboard;
