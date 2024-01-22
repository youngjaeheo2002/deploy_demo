import { Router } from "express";
import { User } from "../models/users.js";
import { Report } from "../models/report.js";
import bcrypt from "bcrypt";
import { usersRouter } from "./user_router.js";
export const staffRouter = Router();

staffRouter.post("/signup", async (req, res) => {
  const plaintextPassword = req.body.password;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(plaintextPassword, salt);
  const existing = await User.findOne({
    username: req.body.username,
  });
  if (existing) {
    return res.status(422).json({ error: "Username already taken" });
  }
  const user = new User({
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    type: "Staff",
    password: hashedPassword,
  });

  try {
    await user.save();
  } catch (err) {
    return res.status(422).json(err);
  }

  return res.json(user);
});

staffRouter.get("/usersandreports", async (req, res) => {
  User.aggregate([
    {
      $match: {
        type: { $ne: "staff" },
        banned: false, // Filter users where the type is not "staff"
      },
    },
    {
      $lookup: {
        from: "reports", // Target collection: "reports"
        localField: "_id", // Field from "users" collection to join on
        foreignField: "reportedId", // Field from "reports" collection to join on
        as: "userReports", // Output field containing the matched reports for each user
      },
    },
    {
      $match: {
        userReports: { $ne: [] }, // Filter users where userReports is not an empty array
      },
    },
    {
      $sort: {
        // Sort users based on the size of the userReports array in descending order
        userReports: -1,
      },
    },
  ]).then((result) => {
    res.json(result);
  });
});

staffRouter.patch("/ban", async (req, res) => {
  const bannedId = req.body.bannedId;
  const user = await User.findOne({
    _id: bannedId,
  });
  if (!user) {
    return res.status(404).json({ error: "Cannot find user" });
  }
  user.banned = true;
  user.bannedDate = Date.now();
  try {
    await user.save();
    return res.json(user);
  } catch {
    return res.status(422).json({ error: "Unprocessable" });
  }
});

staffRouter.patch("/unban", async (req, res) => {
  const unbannedId = req.body.unbannedId;
  const user = await User.findOne({
    _id: unbannedId,
  });
  if (!user) {
    return res.status(404).json({ error: "Cannot find user" });
  }
  user.banned = false;
  user.bannedDate = null;
  try {
    await user.save();
    return res.json(user);
  } catch {
    return res.status(422).json({ error: "Unprocessable" });
  }
});

staffRouter.patch("/resolve", async (req, res) => {
  const userId = req.body.userId;
  const user = await User.findOne({
    _id: userId,
  });
  if (!user) {
    return res.status(404).json({
      error: "User not found",
    });
  }

  await Report.deleteMany({
    reportedId: user._id,
  });

  try {
    await user.save();
    return res.json(user);
  } catch {
    return res.status(422).json({
      error: "Unprocessable",
    });
  }
});

staffRouter.get("/banned", async (req, res) => {
  const users = await User.find({
    banned: true,
  }).sort({ bannedDate: 1 });

  return res.json(users);
});
