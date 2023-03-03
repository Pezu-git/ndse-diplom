const { Schema, model } = require("mongoose");

const UserShema = new Schema({
  name: {
    type: String,
    default: "",
  },
  passwordHash: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
  contactPhone: {
    type: String,
    default: "",
  },
});

module.exports = model("User", UserShema);
