# Steps

- Our aim is to create our own server using react and node js. So our server will run the react app = MERN

- Instead of deploying react app instead we will deploy our server to run the react app

# Step 1: Installation

- Create the server folder and initiate npm init
- Inside the server install the react app as client
- Since we want push both to github git don't allow two repository to be in one respository so we will initiate the server for respository
- By default react app is prepared for githbub so we will unitialized the react app by first

i. Deleting the .gitignore and readme file
ii. Navigate into the client folder and run this command rm -rf .git

# Step 2: Installing the packages for our server

i. express
ii. axios
iii. cookie-session
iv. body-parser

## Development dependicies

i concurrently - running both react and our server at the same time
ii. nodemon

# step 3: Configure the server script

```js
"scripts": {
    "server": "nodemon app.js",
    "start": "node index.js",
    "client": "npm start --prefix client",
    "dev": "concurrently \"npm run server\" \"npm run client\"",
  },
```

# Setting up basic sever

```js
const express = require("express");
const path = require("path");
const app = express();

//ROUTES

app.get("/", (req, res) => {
  res.send("Home");
});

//SERVER
app.listen(port, () => console.log(`Server is running on the port ${port}`));
```

# Authentication setup

```js
//Authentication setup
const axios = require("axios");
const cookieParser = require("cookie-parser");
const session = require("cookie-session");
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;
const API_URL = process.env.API_URL || "http://localhost:1337";
```

# The logic behind our authentication

- Strapi is a headless CMS that help node developers to model, authentication, API very easy
- But one point you have to note is that strapi exposes jwt token after successfull registration or login and this token/jwt is not stored on the server but instead it exposes to the frontend which is not a secure way of authentication so that's why we are creating our own server to store the jwt/token on the server

- By the end of the day we will have a server that runs strapi and our custom server that will run react in development

- So the logic is that instead of our react app talking to strapi server directly, the react app will talk to our custom server and our custom server will talk to strapi server and after creating or loging in user we will take the token/jwt from the strapi server and stored it into our server session

# Configure our server to store the jwt into our server session

```js
//Setting up for session to store our jwt
app.use(cookieParser());
app.use(
  session({
    name: "jwt",
    keys: ["abcs"],
  })
);
```

# Registration user endpoint

```js
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
```

- We will expose this enpoint to our react app for the users details and our custom server will make the post request to strapi

# Login Endpoint

```js
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
```

# Get the logged in user

```js
/GET CURRENT LOGGED IN USER
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

```

# NOTE:

- When a user is authenticated it's token will be available in that route as

```js
//CHECKING IF SESSION IS STORED
//In any route you can console.log req.session.jwt
app.get("/api/testing-session", (req, res) => {
  console.log("Session", req.session.jwt);
  res.send({ status: "OK" });
});
```

# step 4: Client side configuration

- Am a fun of material ui for my styling but you can use any css framework of your choice

# Packages

i. "@material-ui/core"
ii. "@material-ui/icons"
iiii."@material-ui/styles"
iv. axios
v. react-router-dom
vi. redux
vii. react-redux

# React Proxy

- Remember that our react app runs on http://localhost:3000 and since we want to talk to our custom server through http://localhost:5000 we will configure our react proxy, in this any request we will make will point to our server http://localhost:5000

```js
{
  "name": "client",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@testing-library/jest-dom": "^4.2.4",
    "@testing-library/react": "^9.3.2",
    "@testing-library/user-event": "^7.1.2",
    "react": "^16.13.1",
    "react-dom": "^16.13.1",
    "react-scripts": "3.4.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": "react-app"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "proxy": "http://localhost:5000"
}
```
