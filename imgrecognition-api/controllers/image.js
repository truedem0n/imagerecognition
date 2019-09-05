const handler = (req, res,db) => {
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
};
module.exports = {
  handler: handler
};
