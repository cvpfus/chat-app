const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    message: String,
    sender: String,
    colorHEX: String,
  },
  { timestamps: true },
);

chatSchema.set("toJSON", {
  transform: (_, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();

    delete returnedObj._id;
    delete returnedObj.__v;
  },
});

module.exports = mongoose.model("Chat", chatSchema);
