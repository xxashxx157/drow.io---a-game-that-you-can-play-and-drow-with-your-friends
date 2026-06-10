const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// ?? ???????? ????? ???
let strokes = [];

io.on("connection", (socket) => {
  // ????? ????? ??????
  socket.emit("init", strokes);

  // ??????? ??? ????
  socket.on("draw", (data) => {
    strokes.push(data);
    io.emit("draw", data);
  });

  // ??? ??????
  socket.on("clear", () => {
    strokes = [];
    io.emit("clear");
  });
});

const PORT = process.env.PORT || 3001;

http.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on " + PORT);
});