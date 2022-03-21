const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

//Database:
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch((error) => console.error("Error: ", error));

const app = express();
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`> Server is running on Port: ${PORT}`);
});
