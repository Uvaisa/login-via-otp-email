import React, { useState } from "react";
import Card from "@mui/material/Card";
import { useNavigate } from "react-router-dom";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { userVerify } from "../Services/Apis";
const Otp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [otp, setotp] = useState("");
  const Userlogin = async (e) => {
    e.preventDefault();
    if (otp === "") {
      toast.error("please enter the otp");
    } else if (!/[^a-zA_Z]/.test(otp)) {
      toast.error("Please enter valid otp");
    } else if (otp.length < 6) {
      toast.error("otp length must be 6");
    } else {
      const data = { email: location.state, otp };
      console.log(data);
      const response = await userVerify(data);
      if (response.status === 200) {
        localStorage.setItem("userdbToken", response.data.userToken);
        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/dashboard");
        }, 3000);
      } else {
        toast.error(response.response.data.error);
      }
    }
  };
  return (
    <div>
      <Card style={{ width: "400px", margin: "100px", marginLeft: "500px" }}>
        <CardContent>
          <Typography
            sx={{ fontSize: 25, textAlign: "center" }}
            color="text.secondary"
            gutterBottom
          >
            OTP Verification
          </Typography>
          <TextField
            value={otp}
            style={{ width: "350px" }}
            required
            onChange={(e) => setotp(e.target.value)}
            id="outlined-required"
            label="Enter yor Otp"
            //   defaultValue="Enter Email"
          />
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            style={{ textAlign: "center", marginLeft: "130px" }}
            onClick={Userlogin}
          >
            Submit
          </Button>
        </CardActions>
        <ToastContainer />
      </Card>
    </div>
  );
};

export default Otp;
