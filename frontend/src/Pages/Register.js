import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { registerFunction } from "../Services/Apis";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [input, setInput] = useState({
    fname: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fname, email, password } = input;
    if (email === "") {
      toast.error("please enter the email");
    } else if (!email.includes("@")) {
      toast.error("please include @ in the email");
    } else if (password === "") {
      toast.error("please enter the password");
    }
    if (fname === "") {
      toast.error("please enter the fname");
    } else if (password.length < 6) {
      toast.error("minimum 6 character is required");
    } else {
      const response = await registerFunction(input);
      console.log(response);
      if (response.status === 200) {
        setInput({ ...input, fname: "", email: "", password: "" });
        toast.success("user registered successfully");
        navigate("/");
      } else {
        toast.error(response.response.data.error);
      }
    }
  };
  return (
    <Card style={{ width: "400px", margin: "100px", marginLeft: "500px" }}>
      <CardContent style={{}}>
        <Typography
          sx={{ fontSize: 25, textAlign: "center" }}
          color="text.secondary"
          gutterBottom
        >
          Register Form
        </Typography>
        <TextField
          name="fname"
          style={{ width: "350px", marginBottom: "20px" }}
          required
          onChange={handleChange}
          id="outlined-required"
          label="Enter Name"
        />
        <TextField
          name="email"
          style={{ width: "350px", marginBottom: "20px" }}
          required
          onChange={handleChange}
          id="outlined-required"
          label="Enter Email"
        />

        <FormControl sx={{ width: "350px" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            name="password"
            onChange={handleChange}
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
      </CardContent>
      <CardActions>
        <Button
          style={{ marginLeft: "10px", width: "350px" }}
          variant="contained"
          onClick={handleSubmit}
        >
          Sign Up
        </Button>
      </CardActions>
      <ToastContainer />
    </Card>
  );
};

export default Register;
