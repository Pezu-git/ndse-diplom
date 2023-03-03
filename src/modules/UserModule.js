const UserModel = require("../models/User");

const UserModule = {
  create: async (item) => {
    const newUser = new UserModel(item);
    try {
      await newUser.save();
      return { result: true, newUser: newUser };
    } catch (error) {
      return {
        result: false,
        text: `Ошибка регистрации - ${error}`,
        error: error,
      };
    }
  },
  findByEmail: async (email) => {
    try {
      const user = UserModel.find({ email: email }).select("-__v");
      return { result: true, user: user };
    } catch (error) {
      return { result: false, error: error };
    }
  },
};

module.exports = UserModule;
