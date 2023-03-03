const { Schema, model } = require("mongoose");

const MessageShema = new Schema({
  author: {
    type: Object,
    require: true,
  },
  sentAt: {
    type: Date,
    default: Date.now,
  },
  text: {
    type: String,
    default: "",
  },
  readAt: {
    type: Date,
    default: "",
  },
});

module.exports = model("Message", MessageShema);
