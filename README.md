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
const port = process.env.PORT || 5000;

//ROUTES
app.get("/", (req, res) => {
  res.send("Home");
});

//SERVER
app.listen(port, () => console.log(`Server is running on the port ${port}`));
```
