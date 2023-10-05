import React from "react";
import Dashboard from "./Pages/Dashboard";
import Error from "./Pages/Error";
import Login from "./Pages/Login";
import Otp from "./Pages/Otp";
import Register from "./Pages/Register";
import { Routes, Route } from "react-router-dom";
import Header from "./Component/Header";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<Error />} />
        <Route path="/user/otp" element={<Otp />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
