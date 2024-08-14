const chatRouter = require("express").Router();
const Chat = require("../models/chatModel");

chatRouter.get("/", async (req, res) => {
  const chatHistory = await Chat.find({});

  if (chatHistory.length > 100) {
    await Chat.deleteMany({});
    return res.json([]);
  }

  res.json(chatHistory);
});

module.exports = chatRouter;
