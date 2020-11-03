const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const apiRoutes = require("../Server/Apis/Routers");
const mongoose = require("mongoose");
const keys = require("./Configs/secret");
const port = 5000;
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const Chats = require("./Models/Chats");

const corsConfig = {
  origin: true,
  credentials: true,
};

io.on("connection", (socket) => {
  socket.on("message", function (room) {
    socket.join(room.room);
    Chats.findById(room.room, function (err, chat) {
      if (err) {
        console.log(err);
      } else {
        const msg = {
          message: room.message,
          sender: room.sender,
          timeStamp: Date.now()
        };
        chat.messages.push(msg);
        chat.save().then((val) => {
          io.sockets.in(room.room).emit("New" , msg);
        });
      }
    });
  });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./Public"));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.options("*", cors(corsConfig));
app.use(cookieParser());
app.use("/api", apiRoutes);

const db = keys.mongodb.dbURI;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
