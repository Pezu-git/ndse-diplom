const { Schema, model } = require("mongoose");

const SubscribeShema = new Schema({
  user: {
    type: String,
    default: "",
  },
  chats: {
    type: Array,
    default: [],
  },
});

module.exports = model("SubscribeUser", SubscribeShema);
