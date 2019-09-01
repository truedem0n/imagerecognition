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
  res.send(database.users);
});
app.post("/signin", (req, res) => {
  if (req.body.email === database.users[0].email) {
    res.json("signing");
  } else {
    res.status(400).json("error loggin in");
  }
});
app.post("/register", (req, res) => {
  database.users.push({
    id: 125,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    entries: 0,
    joined: new Date()
  });
  res.json(database.users[database.users.length - 1]);
});

app.get("/profile/:id", (req, res) => {
  const  {id} =req.params;
  let found=false
  database.users.forEach(user=>{
    if(user.id==id){
      found=true
      return res.json(user);
    }
  })
  if(!found){
    res.status(404).json("no such user")
  }
});
app.get("/profile/:id", (req, res) => {
  const  {id} =req.params;
  let found=false
  database.users.forEach(user=>{
    if(user.id==id){
      found=true
      return res.json(user);
    }
  })
  if(!found){
    res.status(404).json("no such user")
  }
});

app.listen(3001, () => {
});

// root = this is working (homepage) so get request
// signin= post request (user information)
// register = post request
// profile/:userId  =get information
// /image --> Put request --> update user image requests
