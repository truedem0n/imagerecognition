const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
var pg = require("knex")({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "postgres",
    database: "myapp_test"
  }
});
let id = 125;
app.use(bodyParser.json());
app.use(cors());
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
  res.send(database.users);
});
app.post("/signin", (req, res) => {
  let found = false;
  console.log(req.body);
  database.users.forEach(users => {
    if (
      users.email === req.body.email &&
      users.password === req.body.password
    ) {
      found = true;
      return res.json("success");
    }
  });
  if (!found) {
    res.status(400).json("error loggin in");
  }
});
app.post("/register", (req, res) => {
  database.users.push({
    id: id,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    entries: 0,
    joined: new Date()
  });
  res.json(database.users[database.users.length - 1]);
  id++;
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach(user => {
    if (user.id == id) {
      found = true;
      return res.json(user);
    }
  });
  if (!found) {
    res.status(404).json("no such user");
  }
});
app.put("/image", (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach(user => {
    if (user.id == id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  });
  if (!found) {
    res.status(404).json("no such user");
  }
});

app.listen(3001, () => {});

// root = this is working (homepage) so get request
// signin= post request (user information)
// register = post request
// profile/:userId  =get information
// /image --> Put request --> update user image requests
