const mongoose = require("mongoose");
const Joi = require("joi");
// const { categorySchema } = require("./categoryModel");

const exerciseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    // category: {
    //   type: categorySchema,
    //   required: true,
    // },
    duration: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Exercise = mongoose.model("Exercise", exerciseSchema);

function validateExercise(exercise) {
  const schema = {
    name: Joi.string().min(3).max(50).required(),
    description: Joi.string().required(),
    //categoryId: Joi.objectId().required(),
    duration: Joi.number().required(),
    date: Joi.date().required(),
  };
  return Joi.validate(exercise, schema); //missed this line
}

exports.Exercise = Exercise;
exports.validate = validateExercise;
