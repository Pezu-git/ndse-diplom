const { Schema, model } = require("mongoose");

const ChatShema = new Schema({
  users: {
    type: Array,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  messages: {
    type: Array,
    default: [],
  },
});

module.exports = model("Chat", ChatShema);
