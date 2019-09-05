const handler=(res,req,db)=>{
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
  }

module.exports={
    handler:handler
}