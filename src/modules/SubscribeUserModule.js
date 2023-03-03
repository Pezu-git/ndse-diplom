const SubscribeUser = require("../models/SubscribeUser");
const ChatModel = require("../models/Chat");

const SubscribeUserModule = {
  create: async (item) => {
    const newSubscribe = new SubscribeUser(item);
    try {
      await newSubscribe.save();
      return { result: true, data: newSubscribe };
    } catch (error) {
      return { result: false, error: error };
    }
  },
  createSubscribe: async (data) => {
    try {
      const userSubscr = await SubscribeUser.findOne({
        user: data.userId,
      }).select("-__v");
      if (userSubscr == null) {
        const newSubscr = new SubscribeUser({
          user: data.userId,
          chats: data.chatId,
        });
        try {
          newSubscr.save();
          return { result: true, data: newSubscr };
        } catch (error) {
          return { result: false, error: error };
        }
      }
      if (userSubscr.length !== 0) {
        const chats = userSubscr.chats;
        const ifSubscr = chats.includes(data.chatId);
        if (!ifSubscr) {
          await SubscribeUser.updateOne(
            {
              user: data.userId,
            },
            { $push: { chats: data.chatId } }
          );
        }
        const chat = await ChatModel.findById(data.chatId).select("-__v");
        return {
          result: true,
          data: chat.messages,
        };
      } else {
        const newSubscr = new SubscribeUser({
          user: data.userId,
          chats: data.chatId,
        });
        try {
          newSubscr.save();
          return { result: true, data: newSubscr };
        } catch (error) {
          return { result: false, error: error };
        }
      }
    } catch (error) {
      return { result: false, error: error };
    }
  },

  isSubscribe: async (data) => {
    try {
      const userSubscr = await SubscribeUser.findOne({
        user: data.userId,
      });
      if (userSubscr == null) {
        return { result: false, error: "Вы еще не подписаны на этот чат" };
      }
      if (userSubscr.length !== 0) {
        const chats = userSubscr.chats;
        const ifSubscr = chats.includes(data.chatId);
        if (!ifSubscr) {
          return { result: false, error: "Вы еще не подписаны на этот чат" };
        }
        return { result: true, data: "Вы подписаны на этот чат" };
      }
    } catch (error) {
      return { result: false, error: error };
    }
  },
};

module.exports = SubscribeUserModule;
