const router = require("express").Router();
const AdverisementModule = require("../modules/AdverisementModule");
const advImg = require("../middleware/advertisementImg");

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.redirect("/");
};

module.exports = () => {
  //advertisement
  router.get("/", isAuthenticated, async (req, res) => {
    const adverts = await AdverisementModule.getAll();
    if (adverts.result) {
      res.json({ success: true, data: adverts.data });
    } else {
      res.json({ success: false, error: adverts.error });
    }
  });
  router.post("/find", isAuthenticated, async (req, res) => {
    const advert = await AdverisementModule.find(req.body);
    if (advert.result) {
      res.json({ success: true, data: advert.data });
    } else {
      res.json({ success: false, error: advert.error });
    }
  });
  router.post("/", isAuthenticated, async (req, res) => {
    const advert = await AdverisementModule.create(req.body);
    if (advert.result) {
      res.json({ success: true, data: advert.data });
    } else {
      res.json({ success: false, error: advert.error });
    }
  });
  router.delete("/", isAuthenticated, async (req, res) => {
    const advert = await AdverisementModule.remove(req.body.id);
    if (advert.result) {
      res.json({ success: true, data: "Объявление удалено" });
    } else {
      res.json({ success: false, error: advert.error });
    }
  });

  router.post(
    "/uploadImg",
    isAuthenticated,
    advImg.single("advImg"),
    (req, res) => {
      if (req.file) {
        const { originalname } = req.file;
        res.json({ success: "OK", fileName: originalname });
      }
      res.json();
    }
  );

  return router;
};
