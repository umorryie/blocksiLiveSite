const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const multer = require("multer");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const router = require("./routes/routes");
const path = require("path");
const port = process.env.PORT || 5000;
const uri = require("./mongoDb/key").uri;
require("./mongoDb/mongoDb");
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

app.use(router);

if (process.env.NODE_END === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
