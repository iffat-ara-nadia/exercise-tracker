const cors = require("cors");
const mongoose = require("mongoose");
const usersRoute = require("./routes/usersRoute");
const exercisesRoute = require("./routes/exercisesRoute");
const categoriesRoute = require("./routes/categories");
const express = require("express");
const app = express();

mongoose
  .connect("mongodb://localhost/exercise-tracker")
  .then(() => console.log("MongoDB connection is established successfully..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

app.use(express.json());
app.use(cors());
app.use("/api/users", usersRoute);
app.use("/api/exercises", exercisesRoute); //myerror: api/exercises instead of /api/exercises
app.use("/api/categories", categoriesRoute);

const port = process.env.PORT || 3200;
app.listen(port, () => console.log(`App is listening on PORT ${port}....`));
