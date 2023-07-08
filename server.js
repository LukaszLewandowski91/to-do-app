const express = require("express");
const path = require("path");
const socket = require("socket.io");
const app = express();

const tasks = [];

app.use((req, res) => {
  res.status(404).send({ message: "Not found..." });
});

const server = app.listen(process.env.PORT || 8000, () => {
  console.log("Server is running on port: 8000 ");
});

const io = socket(server);

io.on("connection", (socket) => {
  console.log("New client! Its id – " + socket.id);
  io.to(socket.id).emit("updateData", tasks);

  socket.on("addTask", (taskData) => {
    tasks.push({ id: taskData.id, name: taskData.description });
    socket.broadcast.emit("addTask");
  });

  socket.on("removeTask", (taskId) => {
    tasks = tasks.filter((task) => task.id !== taskId);
    socket.broadcast.emit("removeTask");
  });
});
