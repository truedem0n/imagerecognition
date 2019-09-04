const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const app = express();
const knex = require("knex");
const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "skylord",
    password: "endings12",
    database: "smart-brain"
  }
});

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
  db.select("email","hash").from("login")
    .where("email","=",req.body.email)
    .then(data=>{
      const isValid= bcrypt.compareSync(req.body.password,data[0].hash)
      if(isValid){
        return db.select("*").from('users')
                 .where("email","=",req.body.email)
                 .then(user=>{
                   console.log(user);
                   res.json(user[0])
                 })
                 .catch(err=>res.json("Unable to get user"))
      }else{
        res.json("wrong credentials")
      }
    })
    .catch(err=>{
      res.json("wrong credentials")
    })
  });
app.post("/register", (req, res) => {
  const { email, name, password } = req.body;
  const hash=bcrypt.hashSync(password);
  db.transaction(trx=>{
    trx.insert({
      hash:hash,
      email:email
    })
    .into("login")
    .returning("email")
    .then(loginEmail=>{
      return trx("users")
      .returning("*")
      .insert({
        email: loginEmail[0],
        name: name,
        joined: new Date()
      })
      .then(user => res.json(user[0]))
    })
    .then(trx.commit)
    .catch(trx.rollback)
  })
  .catch(err => res.status(400).json("Unable to register"));
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  db.select("*")
    .from("users")
    .where({ id })
    .then(users => {
      if (users[0]) {
        res.json(users[0]);
      } else {
        res.json("No such user");
      }
    })
    .catch(err => {
      res.json("error getting user");
    });
});
app.put("/image", (req, res) => {
  const { id } = req.body;
  db("users")
    .where({ id })
    .increment("entries", 1)
    .returning("entries")
    .then(entries => {
      if (entries[0]) {
        res.json(entries[0]);
      } else {
        res.json("No such user");
      }
    })
    .catch(err => res.status(400).json("unable to get entries"));
});

app.listen(3001, () => {});

// root = this is working (homepage) so get request
// signin= post request (user information)
// register = post request
// profile/:userId  =get information
// /image --> Put request --> update user image requests
