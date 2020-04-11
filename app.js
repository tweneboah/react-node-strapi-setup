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
