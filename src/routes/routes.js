const router = require("express").Router();
const AdverisementModule = require("../modules/AdverisementModule");
const chatModule = require("../modules/ChatModule");

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.redirect("/");
};

module.exports = (passport) => {
  // Авторизация
  router.get("/login", (req, res) => {
    res.json({ result: "OK", page: "login" });
  });
  router.post(
    "/login",
    passport.authenticate("login", {
      successRedirect: "/",
      failureRedirect: "/login",
    })
  );
  router.post(
    "/signup",
    passport.authenticate("signup", {
      successRedirect: "/",
      failureRedirect: "/signup",
    })
  );
  router.get("/signup", (req, res) => {
    res.json({ result: "OK", page: "signup" });
  });
  router.get("/signout", (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/login");
    });
  });
  //main
  router.get("/", isAuthenticated, (req, res) => {
    res.json({ result: "OK", page: "main" });
  });

  //advertisement
  router.get("/advertisement", (req, res) => {
    res.json({ result: "OK", page: "advertisement" });
  });
  router.post("/advertisement", async (req, res) => {
    const advert = await AdverisementModule.create(req.body);
    if (advert.result) res.json(advert);
  });
  router.delete("/advertisement", async (req, res) => {
    const advert = await AdverisementModule.remove(req.body.id);
    if (advert.result) {
      res.json({ result: true, data: "Объявление удалено" });
    } else {
      res.json({ result: false, data: advert.error });
    }
  });

  //CHAT
  router.get("/chat", (req, res) => {
    res.json({ result: "OK", page: "chat" });
  });
  //post message
  router.post("/chat", async (req, res) => {
    const chat = await chatModule.sendMessage(req.body);
    if (chat.result) {
      res.json({ result: true, data: chat.data });
    } else {
      res.json({ result: true, data: chat.error });
    }
  });

  return router;
};
