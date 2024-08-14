const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const userRouter = require("./controllers/userController");
const chatRouter = require("./controllers/chatController");
const mongoose = require("mongoose");
const { MONGODB_URI } = require("./utils/config");
const middleware = require("./utils/middleware");
const cors = require("cors");
const Chat = require("./models/chatModel");
const { randomInt } = require("node:crypto");
const { COLORS } = require("./utils/constants");
const PORT = process.env.PORT;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.info("connected to MongoDB");
  })
  .catch((error) => {
    console.error("database connection error:", error.message);
  });

const app = express();
const server = createServer(app);
const io = new Server(server, {
  path: "/chat/",
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(express.json());
app.use(express.static("dist"));

app.use("/api/user", userRouter);
app.use("/api/chat", chatRouter);

io.on("connection", (socket) => {
  socket.on("chat", async (msg) => {
    try {
      console.time("time");
      const senderHistory = await Chat.find({ sender: msg.sender });

      const chatCount = await Chat.estimatedDocumentCount({});
      if (chatCount > 100) await Chat.deleteMany({});

      let chat;

      if (senderHistory.length === 0) {
        chat = new Chat({
          sender: msg.sender,
          message: msg.message,
          colorHEX: COLORS[randomInt(COLORS.length)],
        });
      } else {
        chat = new Chat({
          sender: msg.sender,
          message: msg.message,
          colorHEX: senderHistory[0].colorHEX,
        });
      }

      await chat.save();
      io.emit("chat", { ...chat._doc, id: chat._id.toString() });
      console.timeEnd("time");
    } catch (error) {
      console.error(error.message);
    }
  });
});

app.use(middleware.unknownEndpoint);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
