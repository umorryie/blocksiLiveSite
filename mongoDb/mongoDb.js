const mongoose = require("mongoose");
const uri = require("./key").uri;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(console.log("Connected to MongoDb"))
  .catch((err) => console.log(err));
