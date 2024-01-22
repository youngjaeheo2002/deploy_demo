import mongoose from "mongoose";
import { User } from "./users.js";

const limeEventSchema = new mongoose.Schema({
  eventName: {
    required: true,
    type: String,
  },
  eventDescription: {
    required: true,
    type: String,
  },
  eventDate: {
    type: Date,
    //required:true,
  },
  eventLocation: {
    required: true,
    type: String,
  },
  interestedUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: [],
    },
  ],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const limeEvent = mongoose.model("limeEvent", limeEventSchema);
