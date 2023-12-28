const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan")

require("dotenv").config();

const port = process.env.PORT;

const app = express();

app.use("/files", express.static(path.join(__dirname, "files")));
app.use(morgan("dev"))
app.use(express.json());
app.use(cors());
app.use(require("./routes"));

mongoose
  .connect(process.env.CONNECT)
  .then(() => {
    console.log("connected");
    app.listen(port, () => {
      console.log(`server has been started on port ${port}`);
    });
  })
  .catch((e) => {
    console.log(e);
  });
