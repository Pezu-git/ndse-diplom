const express = require("express");
const path = require("path");
const expressSession = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");
const http = require("http");

const app = express();

const server = http.createServer(app);
const initPassport = require("./authenticate/init");
const socketIO = require("socket.io");
// const io = socketIO(server);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
const { chatSocket } = require("./lib/socketIo");

app.use(
  express.json({
    type: ["application/json", "text/plain"],
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, ".." + "/public")));

app.use(
  expressSession({
    secret: "mySecretKey",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
initPassport(passport);
const loginRouter = require("./routes/loginRouter")(passport);
const mainRouter = require("./routes/mainRouter")(passport);
const chatRouter = require("./routes/chatRouter")(passport);
const advertisementRouter = require("./routes/advertisementRouter")(passport);
app.use("/login", loginRouter);
app.use("/", mainRouter);
app.use("/chat", chatRouter);
app.use("/advertisement", advertisementRouter);
// const routes = require("./routes/routes")(passport);
// app.use("/", routes);

mongoose.set("strictQuery", true);

async function startServer(PORT, URL_DB) {
  try {
    await mongoose.connect(URL_DB);

    server.listen(PORT, () => {
      console.log(`Library listening host ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }

  chatSocket(io);
}

const URL_DB = process.env.URL_DB;
const PORT = process.env.PORT || 5555;

startServer(PORT, URL_DB);
