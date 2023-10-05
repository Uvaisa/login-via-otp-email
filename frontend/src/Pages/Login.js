import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import { sentOtpFunction } from "../Services/Apis";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
const Login = () => {
  const [email, setEmail] = useState("");
  const [spiner, setSpiner] = useState(false);
  const navigate = useNavigate();
  const sendOtp = async (e) => {
    e.preventDefault();
    if (email === "") {
      toast.error("please enter the email");
    } else if (!email.includes("@")) {
      toast.error("please include @ in the email");
    } else {
      setSpiner(true);
      const data = {
        email: email,
      };
      const response = await sentOtpFunction(data);

      if (response.status === 200) {
        setSpiner(false);
        navigate("/user/otp", { state: email });
      } else {
        toast.error(response.response.data.error);
      }
    }
  };
  return (
    <Card style={{ width: "400px", margin: "100px", marginLeft: "500px" }}>
      <CardContent>
        <Typography
          sx={{
            fontSize: 35,
            textAlign: "center",
            color: "#3498db",
            marginBottom: "-10px",
          }}
          color="text.secondary"
          gutterBottom
        >
          Login Form
        </Typography>
        <Typography
          sx={{
            fontSize: 20,
            textAlign: "center",
            color: "gray",
            marginBottom: "20px",
          }}
          color="text.secondary"
          gutterBottom
        >
          we are glad you are back
        </Typography>
        <TextField
          value={email}
          style={{ width: "350px" }}
          required
          onChange={(e) => setEmail(e.target.value)}
          id="outlined-required"
          label="Enter Email"
          //   defaultValue="Enter Email"
        />
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          onClick={sendOtp}
          style={{ textAlign: "center", marginLeft: "130px", fontSize: "15px" }}
        >
          Send OTP
          {spiner ? (
            <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
              <CircularProgress color="secondary" />
            </Stack>
          ) : (
            ""
          )}
        </Button>
      </CardActions>
      <Typography
        sx={{
          fontSize: 15,
          textAlign: "center",
        }}
        color="text.secondary"
        gutterBottom
      >
        Don't have an account?
        <NavLink
          to={"/register"}
          style={{ textDecoration: "none", color: "#b900ff" }}
        >
          Sign Up
        </NavLink>
      </Typography>
      <ToastContainer />
    </Card>
  );
};

export default Login;
