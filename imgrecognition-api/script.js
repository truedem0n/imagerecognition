const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
const database = {
  users: [
    {
      id: 123,
      name: "John",
      email: "john@gmail.com",
      password: "cookies",
      entries: 0,
      joined: new Date()
    },
    {
      id: 124,
      name: "Sally",
      email: "sally@gmail.com",
      password: "cookie",
      entries: 0,
      joined: new Date()
    }
  ]
};

app.get("/", (req, res) => {
  res.send("this is working");
});
app.post("/signin", (req, res) => {
  if (req.body.email === database.users[0].email) {
    res.json("signing");
  } else {
    res.status(400).json("error loggin in");
  }
});

app.listen(3001, () => {
  console.log("app is running");
});

// root = this is working (homepage) so get request
// signin= post request (user information)
// register = post request
// profile/:userId  =get information
// /image --> Put request --> update user image requests
