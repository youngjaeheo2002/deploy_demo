import mongoose from "mongoose";

export const interestsEnum = [
  "Music concerts",
  "Art exhibitions",
  "Film screenings",
  "Theater performances",
  "Dance shows",
  "Stand-up comedy",
  "Literary readings",
  "Food festivals",
  "Wine tasting events",
  "Sporting events",
  "Outdoor adventures",
  "Fashion shows",
  "Technology conferences",
  "Gaming conventions",
  "Yoga and wellness retreats",
  "Photography workshops",
  "Charity fundraisers",
  "Historical reenactments",
  "Science fairs",
  "Cultural festivals",
];

const userSchema = new mongoose.Schema({
  username: {
    required: true,
    type: String,
    unique: true,
  },
  firstName: {
    required: true,
    type: String,
  },
  lastName: {
    required: true,
    type: String,
  },
  type: {
    type: String,
    enum: ["Basic", "Premium", "Staff"],
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  interests: [
    {
      type: String,
      enum: interestsEnum,
      default: [],
    },
  ],
  blocked: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      default: [],
    },
  ],
  banned: {
    type: Boolean,
    default: false,
  },
  bannedDate: {
    type: Date,
  },
});

export const User = mongoose.model("User", userSchema);
