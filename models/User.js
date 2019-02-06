const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fields = {
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  isActive: {
    type: Boolean
  },
  picture: {
    type: String
  },
  gender: {
    type: String
  },
  phone: {
    type: String
  },
  age: {
    type: Number
  }
};

const UserSchema = Schema(fields);

module.exports = mongoose.model("users", UserSchema);
