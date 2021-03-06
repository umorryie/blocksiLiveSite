const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const Schema = mongoose.Schema;

const Users = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(mail) {
      if (!validator.isEmail(mail)) {
        throw new Error("Reuiqre existing email");
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
    validate(pw) {
      if (pw.length < 6) {
        console.log("not");
        throw new Error("Password not long enough.");
      }
      if (pw === "password") {
        console.log("not");

        throw new Error("Password shall not be: password");
      }
    },
  },
  contacts: {
    type: Array,
    default: [],
  },
});
//______________________________________________________________________
// commented because it is chaning and its not working
//Users.pre("save", async function (next) {
//if (this.password) {
//  this.password = await bcrypt.hash(this.password, 8);
// }
// next();
//});
//______________________________________________________________________
/*
async function checkUser(id, pw) {
  //... fetch user from a db etc.
  const prvi = await User.findOne({ _id: id });
  const match = await bcrypt.compare(pw, User.password);

  if (match) {
    console.log(match);
  } else {
    console.log(match);
  }
}
checkUser("5ec7fb7f0c31755ad802df10", "fddr3sdd");
*/
/*
Users.statics.getUser = (password) => {
  const user = this;
  const aliJe = bcrypt.compare(password, user.password);
  aliJe.then(console.log);
  return aliJe;
};

Users.pre("save", (next) => {
  const user = this;
  console.log("not");

  console.log(user.password);
  console.log("this.", this.password);
  console.log("bcrypta");
  user.password = bcrypt.hash(user.password, 10);
  console.log("naprej");
  next();
});*/
/*
Users.pre("save", function (next) {
  if (this.password) {
    var salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
  }
  next();
});
*/
const User = mongoose.model("User", Users);
module.exports = User;
