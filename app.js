const express = require("express");
const path = require("path");
const app = express();
//Authentication setup
const axios = require("axios");
const cookieParser = require("cookie-parser");
const session = require("cookie-session");
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;
const API_URL = process.env.API_URL || "http://localhost:1337";

//Setting up for session to store our jwt
app.use(cookieParser());
app.use(
  session({
    name: "jwt",
    keys: ["abcs"],
  })
);

//ROUTES
app.get("/", (req, res) => {
  res.send("Home");
});

app.post("/api/auth/local/register", async (req, res) => {
  try {
    const registerRes = await axios({
      method: "POST",
      url: `${API_URL}/auth/local/register`,
      data: req.body,
    });
    console.log(registerRes.data);
    //Destructure and remove the jwt from sending to frontend
    const { jwt, user } = registerRes.data;
    //Put the jwt into session
    req.session.jwt = jwt;
    console.log("Session", req.session.jwt);
    const data = user;
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

//Login
app.post("/api/auth/local", async (req, res) => {
  console.log("POST LOGIN BODY", req.body);
  try {
    const loginRes = await axios({
      url: `${API_URL}/auth/local`,
      method: "POST",
      data: req.body,
    });
    console.log("POST LOGIN STRAP", loginRes);
    //destructure the registered user and save the jwt into session and sent the user details to the backend
    const { jwt, user } = loginRes.data;
    //save to session
    req.session.jwt = jwt;
    const data = { user };
    res.send(data);
  } catch (error) {
    res.send(error);
  }
});

//GET CURRENT LOGGED IN USER
app.get("/users/me", async (req, res) => {
  const { jwt } = req.session;
  try {
    const currentUserRes = await axios({
      method: "GET",
      url: `${API_URL}/users/me`,
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    res.send(currentUserRes.data);
  } catch (error) {
    res.send({
      errMsg: "Login/Register First",
    });
  }
});

//SERVER
app.listen(port, () => console.log(`Server is running on the port ${port}`));
