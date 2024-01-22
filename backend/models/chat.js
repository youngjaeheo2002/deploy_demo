import mongoose from "mongoose";

const chatMessageSchema = new mongoose.Schema({
  senderName: String,
  message: String,
  date: String,
});

const chatRoomSchema = new mongoose.Schema({
  name: String,
  messages: [chatMessageSchema],
});

export const ChatRoom = mongoose.model("ChatRoom", chatRoomSchema);
