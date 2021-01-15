const { Exercise, validate } = require("../models/exerciseModel");
const { Category } = require("../models/categoryModel");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const exercises = await Exercise.find().sort({ duration: 1 });
  res.send(exercises);
});

router.get("/:id", async (req, res) => {
  const exercise = await Exercise.findById(req.params.id);
  if (!exercise)
    return res
      .status(404)
      .send("The exercise with the given ID was not found...");

  res.send(exercise);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // const category = await Category.findById(req.body.categoryId);
  // if (!category) return res.status(400).send("Invalid category.");

  let exercise = new Exercise({
    name: req.body.name,
    description: req.body.description,
    // category: {
    //   _id: category._id,
    //   name: category.name,
    // },
    duration: Number(req.body.duration),
    date: Date.parse(req.body.date),
  });
  exercise = await exercise.save();
  res.send(exercise);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // const category = await Category.findById(req.body.categoryId);
  // if (!category) return res.status(400).send("Invalid category.");

  const exercise = await Exercise.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      // category: {
      //   _id: category._id,
      //   name: category.name,
      // },
      duration: Number(req.body.duration),
      date: Date.parse(req.body.date),
    },
    { new: true }
  );

  if (!exercise)
    return res
      .status(404)
      .send("The exercise with the GIVEN ID was not found... ");

  res.send(exercise);
});

router.delete("/:id", async (req, res) => {
  const exercise = await Exercise.findByIdAndRemove(req.params.id);
  if (!exercise)
    return res
      .status(404)
      .send("The exercise with the GIVEN ID was not found...");

  res.send(exercise);
});

module.exports = router;
