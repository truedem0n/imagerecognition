const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const app = express();
const knex = require("knex"),
  register = require("./controllers/register"),
  profile = require("./controllers/profile"),
  image = require("./controllers/image"),
  signin = require("./controllers/signin");
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
app.post("/signin", (req, res) => signin.handler(req,res,db,bcrypt));
app.post("/register", (req, res) => register.handler(req, res, db, bcrypt));
app.get("/profile/:id", (req, res) => profile.handler(req, res, db));
app.put("/image", (req, res) => image.handler(req, res, db));

app.listen(3001, () => {});
