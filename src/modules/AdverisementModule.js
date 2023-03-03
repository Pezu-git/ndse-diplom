const AdvertModel = require("../models/Advertisement");

const AdvertModule = {
  getAll: async () => {
    try {
      const adverts = await AdvertModel.find().select("-__v");
      return { result: true, data: adverts };
    } catch (error) {
      return { result: true, error: error };
    }
  },
  find: async (props) => {
    try {
      if (props.param === "userId") {
        const advert = await AdvertModel.find({
          userId: props.value,
        }).select("-__v");
        return { result: true, data: advert };
      }
      const reg = new RegExp(props.value);
      const advert = await AdvertModel.find({
        [props.param]: reg,
      }).select("-__v");
      return { result: true, data: advert };
    } catch (error) {
      return { result: true, error: error };
    }
  },
  create: async (data) => {
    const newAdvert = new AdvertModel(data);
    try {
      await newAdvert.save();
      return { result: true, data: newAdvert };
    } catch (error) {
      return { result: false, error: error };
    }
  },
  remove: async (id) => {
    try {
      const date = Date.now();
      await AdvertModel.updateOne(
        { id: id },
        { $set: { isDeleted: true, updatedAt: date } }
      );
      return { result: true };
    } catch (error) {
      return { result: false, error: error };
    }
  },
};

module.exports = AdvertModule;
