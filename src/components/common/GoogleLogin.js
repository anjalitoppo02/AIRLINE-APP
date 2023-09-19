import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import GoogleIcon from "@mui/icons-material/Google";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/actions/authAction.js";

function GoogleSignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState([]);

  const googlelogin = useGoogleLogin({
    onSuccess: (codeResponse) => setUser([codeResponse]),
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (user.length > 0) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user[0].access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user[0].access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          if (res.data.email === "anjalitoppo0218@gmail.com") {
            dispatch(login(localStorage.setItem("role", "admin")));
          } else {
            dispatch(login(localStorage.setItem("role", "staff")));
          }
          navigate("/flights");
        })
        .catch((err) => console.log(err));
    }
  }, [user, dispatch, navigate]);

  return (
    <Button onClick={() => googlelogin()}>
      <GoogleIcon sx={{ mr: 1 }} /> Sign in with Google
    </Button>
  );
}

export default GoogleSignIn;
