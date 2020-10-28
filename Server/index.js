const express = require("express");
const http = require('http');
const socketio = require('socket.io')
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

const corsConfig = {
  origin: true,
  credentials: true,
};

io.on('connection' , socket=>{
  console.log("assa")
})

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./Public'));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.options('*', cors(corsConfig));
app.use(cookieParser());
app.use("/api", apiRoutes);

const db = keys.mongodb.dbURI;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
