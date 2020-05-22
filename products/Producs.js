const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema;

const Contacts = new Schema({
  name: {
    type: String,
    required: true,
  },
  surrname: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
});

const Contact = mongoose.model("Contact", Contacts);
module.exports = Contact;
