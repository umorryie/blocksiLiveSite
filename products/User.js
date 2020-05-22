const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema;

const Users = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  contacts: {
    type: Array,
  },
});

const User = mongoose.model("User", Users);
module.exports = User;
