const { User, validate } = require("../models/userModel");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const users = await User.find().sort({ name: 1 });
  res.send(users);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = new User({
    name: req.body.name
  });

  user = await user.save();
  res.send(user);
});

module.exports = router;
