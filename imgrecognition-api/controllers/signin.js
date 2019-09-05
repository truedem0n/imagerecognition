const handler = (req, res, db, bcrypt) => {
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
};
module.exports = {
  handler: handler
};
