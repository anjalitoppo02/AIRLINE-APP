import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Typography,
  CssBaseline,
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

const theme = createTheme();

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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ background: "#01579b" }}>
          <Toolbar>
            {user ? (
              <NavLink to="/flights">
                <IconButton
                  size="large"
                  aria-label="Home Icon"
                  sx={{ color: "#fff" }}
                >
                  <HomeIcon />
                </IconButton>
              </NavLink>
            ) : null}
            <Typography
              variant="subtitle1"
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
                variant="outlined"
                color="inherit"
                aria-label="Logout Button"
              >
                Logout
              </Button>
            ) : null}
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}

export default Header;
