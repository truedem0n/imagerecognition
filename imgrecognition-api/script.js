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
app.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json("empty input not allowed in signin");
  }
  db.select("email", "hash")
    .from("login")
    .where("email", "=", email)
    .then(data => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db
          .select("*")
          .from("users")
          .where("email", "=", req.body.email)
          .then(user => {
            res.json(user[0]);
          })
          .catch(err => res.json("Unable to get user"));
      } else {
        res.json("wrong credentials");
      }
    })
    .catch(err => {
      res.json("wrong credentials");
    });
});
app.post("/register", (req, res) => {
  const { email, name, password } = req.body;
  if (!email || !password || !name) {
    return res.json("empty input not allowed in register");
  }
  const hash = bcrypt.hashSync(password);
  db.transaction(trx => {
    trx
      .insert({
        hash: hash,
        email: email
      })
      .into("login")
      .returning("email")
      .then(loginEmail => {
        return trx("users")
          .returning("*")
          .insert({
            email: loginEmail[0],
            name: name,
            joined: new Date()
          })
          .then(user => res.json(user[0]));
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch(err => res.status(400).json("Unable to register"));
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
