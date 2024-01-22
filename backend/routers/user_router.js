import { Router } from "express";
import { User, interestsEnum } from "../models/users.js";
import bcrypt from "bcrypt";
import { isAuthenticated } from "../middleware/auth.js";
export const usersRouter = Router();
import { Report } from "../models/report.js";

usersRouter.post("/signup", async (req, res) => {
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
    type: req.body.type,
    password: hashedPassword,
  });

  try {
    await user.save();
  } catch (err) {
    return res.status(422).json(err);
  }

  return res.json(user);
});

usersRouter.post("/login", async (req, res) => {
  const user = await User.findOne({
    username: req.body.username,
  });
  if (!user) {
    return res.status(404).json({ error: "Credentials not found" });
  }

  if (user.banned) {
    return res.status(403).json({ error: "Banned" });
  }

  if (!bcrypt.compareSync(req.body.password, user.password)) {
    return res.status(401).json({ error: "Credentials not found" });
  }
  req.session.userId = user._id;
  user.message = "login successful";
  return res.json(user);
});

usersRouter.get("/logout", isAuthenticated, (req, res) => {
  // Destroy the session
  req.session.destroy((err) => {
    if (err) {
      console.log("Error destroying session:", err);
    }
    return res.json({ message: "Logout successful" });
  });
});

usersRouter.patch("/switchToPremium", isAuthenticated, async (req, res) => {
  const user = await User.findOne({
    _id: req.session.userId,
  });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  user.type = "Premium";

  try {
    await user.save();
  } catch (err) {
    return res.status(422).json(err);
  }

  return res.json(user);
});

usersRouter.get("/getMe", isAuthenticated, async (req, res) => {
  const user = await User.findOne({
    _id: req.session.userId,
  });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  user.password = null;
  return res.json(user);
});

usersRouter.get("/id=:id", isAuthenticated, async (req, res) => {
  const user = await User.findOne({
    _id: req.params.id,
  });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  user.password = null;
  return res.json(user);
});

usersRouter.patch("/profile", isAuthenticated, async (req, res) => {
  const interests = req.body.interests;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const userId = req.body.userId;
  if (req.session.userId !== userId) {
    return res
      .status(401)
      .json({ error: "Only allowed to change your own profile" });
  }

  const user = await User.findOne({
    _id: userId,
  });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  user.interests = interests;
  user.firstName = firstName;
  user.lastName = lastName;
  user.save();
  return res.json({ message: "Profile changed" });
});

usersRouter.patch("/block", isAuthenticated, async (req, res) => {
  const blockedUserId = req.body.blockedUserId;
  if (blockedUserId === req.session.userId) {
    return res.status(401).json({
      error: "Cannot block yourself",
    });
  }
  const me = await User.findOne({
    _id: req.session.userId,
  });

  if (me.blocked.indexOf(blockedUserId) === -1) {
    me.blocked.push(blockedUserId);
  }

  try {
    me.save();
  } catch {
    return res.status(422).json({ error: "Block didn't work" });
  }
  return res.json({ message: "Block successful" });
});

function jaroWinklerDistance(str1, str2) {
  // Implement the Jaro-Winkler distance calculation logic here
  // You can use external libraries or implement the algorithm yourself
  // and return the distance value
  // Jaro similarity
  const m = Math.min(str1.length, str2.length);
  const matchRange = Math.floor(m / 2) - 1;

  let matches = 0;
  let transpositions = 0;

  const str1Matches = new Array(str1.length).fill(false);
  const str2Matches = new Array(str2.length).fill(false);

  for (let i = 0; i < str1.length; i++) {
    const start = Math.max(0, i - matchRange);
    const end = Math.min(i + matchRange + 1, str2.length);

    for (let j = start; j < end; j++) {
      if (!str2Matches[j] && str1[i] === str2[j]) {
        str1Matches[i] = true;
        str2Matches[j] = true;
        matches++;
        break;
      }
    }
  }

  if (matches === 0) {
    return 0;
  }

  // Transpositions
  let k = 0;
  for (let i = 0; i < str1.length; i++) {
    if (str1Matches[i]) {
      let j = k;
      while (!str2Matches[j] && j < str2.length) {
        j++;
      }

      if (str1[i] !== str2[j]) {
        transpositions++;
      }

      k = j + 1;
    }
  }

  const jaroSimilarity =
    (matches / str1.length +
      matches / str2.length +
      (matches - transpositions / 2) / matches) /
    3;

  // Jaro-Winkler distance
  const prefixLength = Math.min(4, Math.max(0, m));
  let commonPrefix = 0;

  for (let i = 0; i < prefixLength; i++) {
    if (str1[i] === str2[i]) {
      commonPrefix++;
    } else {
      break;
    }
  }

  const jaroWinklerDistance =
    jaroSimilarity + commonPrefix * 0.1 * (1 - jaroSimilarity);

  return jaroWinklerDistance;
}

// Function to search users based on Jaro-Winkler distance
async function searchUsersByJaroWinkler(queryString) {
  const users = await User.aggregate([
    {
      $addFields: {
        distance: {
          $function: {
            body: jaroWinklerDistance,
            args: ["$username", queryString],
            lang: "js",
          },
        },
      },
    },
    {
      $match: {
        distance: { $gte: 0.8 }, // Adjust the threshold as needed
      },
    },
  ]);

  return users;
}

usersRouter.get(
  "/usersearch/queryString=:queryString",
  isAuthenticated,
  async (req, res) => {
    const user = await User.findOne({
      _id: req.session.userId,
    });
    if (!user) {
      return res.status(404).json({ error: "Cannot find YOU" });
    }
    const queryString = req.params.queryString;
    if (queryString === "") {
      return res.json([]);
    }
    const users = await User.aggregate([
      {
        $addFields: {
          distance: {
            $function: {
              body: jaroWinklerDistance,
              args: ["$username", queryString],
              lang: "js",
            },
          },
        },
      },
      {
        $match: {
          distance: { $gte: 0.8 },
          _id: { $nin: user.blocked },
          // Adjust the threshold as needed
        },
      },
      {
        $limit: 10,
      },
    ]);

    return res.json(users);
  },
);

usersRouter.post("/report", isAuthenticated, async (req, res) => {
  const reporterId = req.session.userId;
  const reportMsg = req.body.reportMsg;
  const reportedUsername = req.body.reportedUsername;
  const messageTxt = req.body.messageTxt;

  const reportedUser = await User.findOne({
    username: reportedUsername,
  });
  if (!reportedUser) {
    return res.status(404).json({ error: "Reported User not found" });
  }
  const reportedUserId = reportedUser._id;

  const report = new Report({
    reporterId: reporterId,
    reportedId: reportedUserId,
    reportMsg: reportMsg,
    messageText: messageTxt,
  });

  try {
    await report.save();
    return res.json({ message: "Reported" });
  } catch {
    return res.status(422).json({ error: "Report creation failed" });
  }
});

usersRouter.get("/interests", isAuthenticated, async (req, res) => {
  return res.json(interestsEnum);
});

usersRouter.delete("/username=:username", async (req, res) => {
  const username = req.params.username;

  const user = User.findOne({
    username: username,
  });

  if (!user) {
    return res.status(404).json({ error: "user not found" });
  }

  try {
    User.deleteOne({
      username: username,
    });
  } catch {
    return res.status(422).json({ error: "delete didn't work!" });
  }

  return res.json({ message: "delete successful" });
});
