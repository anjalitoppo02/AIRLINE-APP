import React from "react";
import {
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Box,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/actions/authAction.js";
import { googleLogout } from "@react-oauth/google";

function Header() {
  const user = localStorage.getItem("role");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const SignOut = () => {
    googleLogout();
    dispatch(logout(localStorage.removeItem("role")));
    navigate("/signin");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className="header">
        <Toolbar>
          {user ? (
            <NavLink to="/flights">
              <IconButton
                size="medium"
                aria-label="Home Icon"
                className="homeIcon"
              >
                <HomeIcon />
              </IconButton>
            </NavLink>
          ) : null}
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
            aria-label="Airline Check-In App"
          >
            Airline Check-In App
          </Typography>

          {user ? (
            <Button
              onClick={SignOut}
              variant="contained"
              color="inherit"
              aria-label="Logout Button"
              className="logoutBtn"
            >
              Logout
            </Button>
          ) : null}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
