const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema;

const UniqueProduct = new Schema({
  name: {
    type: String,
    required: true,
    validate(ime) {
      if ((typeof ime).toLowerCase() !== "string" || ime === " ") {
        throw new Error("Name must be string.");
      }
    },
  },
  price: {
    type: Number,
    required: true,
    validate(cena) {
      if ((typeof cena).toLowerCase() !== "number") {
        throw new Error("Price must be number.");
      }
    },
  },
  available: {
    type: Boolean,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: new Date(),
  },
  productID: {
    type: Number,
    required: true,
    unique: true,
  },
});

const Product = mongoose.model("Product", UniqueProduct);
module.exports = Product;
