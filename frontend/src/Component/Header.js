import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import { colors } from "@mui/material";
import "../Styles/headers.css";
const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className="nav">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontSize: "25px" }}
          >
            Mohd Uvais
          </Typography>
          <NavLink to="/" className="link" style={{ marginRight: "20px" }}>
            Login
          </NavLink>
          <NavLink to="/register" className="link">
            {" "}
            Register
          </NavLink>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default Header;
