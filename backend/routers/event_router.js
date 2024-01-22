import { Router } from "express";
import { User } from "../models/users.js";
import { limeEvent } from "../models/limeEvents.js";

export const eventsRouter = Router();

eventsRouter.get("/", async (req, res) => {
  let filter = {};
  if (req.query.userId) {
    filter.userId = req.query.userId;
  }

  let sort = {};
  if (req.query.sort) {
    const sortArray = req.query.sort.split("-");
    if (sortArray[0] !== "" && sortArray[1] === "asc") {
      sort[sortArray[0]] = 1;
    } else if (sortArray[0] !== "" && sortArray[1] === "desc") {
      sort[sortArray[0]] = -1;
    } else {
      return res.status(400).json({ error: "Invalid sort parameter" });
    }
  }

  if (req.query.eventDateMin) {
    filter.eventDate = { $gte: req.query.eventDateMin + ":00.000Z" };
  }

  if (req.query.eventDateMax) {
    if (!filter.eventDate) {
      filter.eventDate = {};
    }
    filter.eventDate.$lte = req.query.eventDateMax + ":00.000Z";
  }

  if (req.query.eventLocation) {
    filter.eventLocation = { $regex: req.query.eventLocation, $options: "i" };
  }

  let events;
  if (sort === "") {
    events = await limeEvent.find(filter);
  } else {
    events = await limeEvent.find(filter).sort(sort);
  }

  return res.json(events);
});

eventsRouter.post("/", async (req, res) => {
  const event = new limeEvent({
    eventName: req.body.eventName,
    eventDescription: req.body.eventDescription,
    eventDate: req.body.eventDate,
    eventLocation: req.body.eventLocation,
    userId: req.body.userId,
  });

  try {
    await event.save();
  } catch (err) {
    return res.status(422).json(err);
  }

  return res.json(event);
});

eventsRouter.get("/:id", async (req, res) => {
  const event = await limeEvent.findById(req.params.id);
  return res.json(event);
});

/*eventsRouter.patch("/interested", async (req, res) => {
  const event = await limeEvent.findById(req.body.eventId);
  
  if(req.body.action === "add" && !event.interestedUsers.includes(req.body.userId)){
    event.interestedUsers.push(req.body.userId);
  } else if(req.body.action === "remove"){
    event.interestedUsers = event.interestedUsers.filter((userId) => userId !== req.body.userId);
  }

  try {
    await event.save();
  } catch (err) {
    return res.status(422).json(err);
  }

  return res.json(event);
});*/

eventsRouter.patch("/joinEvent", async (req, res) => {
  const event = await limeEvent.findById(req.body.eventId);

  if (!event.interestedUsers.includes(req.body.userId))
    event.interestedUsers.push(req.body.userId);

  try {
    await event.save();
  } catch (err) {
    return res.status(422).json(err);
  }

  return res.json(event);
});

eventsRouter.patch("/leaveEvent", async (req, res) => {
  const event = await limeEvent.findById(req.body.eventId);

  event.interestedUsers.pull(req.body.userId);

  try {
    await event.save();
  } catch (err) {
    return res.status(422).json(err);
  }

  return res.json(event);
});

eventsRouter.patch("/:id", async (req, res) => {
  const event = await limeEvent.findById(req.params.id);
  event.eventName = req.body.eventName;
  event.eventDescription = req.body.eventDescription;
  event.eventDate = req.body.eventDate;
  event.eventLocation = req.body.eventLocation;

  try {
    await event.save();
  } catch (err) {
    return res.status(422).json(err);
  }

  return res.json(event);
});

eventsRouter.get("/eventSearch/queryString=:queryString", async (req, res) => {
  let events = [];
  const queryString = req.params.queryString;
  if (queryString === "") {
    return res.json(events);
  }

  console.log(req.query.userId);

  if (req.query.userId)
    events = await limeEvent.find({
      eventName: { $regex: queryString, $options: "i" },
      userId: req.query.userId,
    });
  else
    events = await limeEvent.find({
      eventName: { $regex: queryString, $options: "i" },
    });

  return res.json(events);
});
