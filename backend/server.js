import express from "express";
import expressWs from "express-ws";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import session from "express-session";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import WebSocket from "ws";
import { usersRouter } from "./routers/user_router.js";
import { eventsRouter } from "./routers/event_router.js";
import { ChatRoom } from "./models/chat.js";
import { staffRouter } from "./routers/staff_router.js";
const app = express();
const appWs = expressWs(app);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    secret: "YourSecretKey",
    resave: false,
    saveUninitialized: true,
  }),
);

dotenv.config();

const corsOptions = {
  origin: process.env.FRONTEND,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/users", usersRouter);
app.use("/api/events", eventsRouter);
app.use("/api/staff", staffRouter);
const chatRoomClientsMap = new Map(); // Map to store chat rooms and their respective clients

// WebSocket endpoint for chat rooms
app.ws("/chatroom/:id", async (ws, req) => {
  const { id } = req.params;

  // Find the chat room by its ID or create a new one
  let chatRoom = await ChatRoom.findById(id);
  if (!chatRoom) {
    chatRoom = new ChatRoom({ _id: id, name: "Chat Room" });
  }

  const chatRoomClients = chatRoomClientsMap.get(id);
  if (!chatRoomClients) {
    chatRoomClientsMap.set(id, new Set([ws]));
  } else {
    chatRoomClients.add(ws);
  }

  // Send previous messages to the joining client
  ws.send(JSON.stringify(chatRoom.messages));

  // Handle new WebSocket connection
  ws.on("message", async (message) => {
    // Parse the incoming message
    const data = JSON.parse(message);

    // Create a new chat message with senderName and message fields
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });

    const chatMessage = {
      senderName: data.senderName,
      message: data.message,
      date: formattedDate,
    };

    try {
      // Add the chat message to the chat room's messages array
      chatRoom.messages.push(chatMessage);

      // Save the chat room object with the new message
      await chatRoom.save();

      // Broadcast the new message to all clients in the chat room
      const clients = chatRoomClientsMap.get(id);
      clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify([chatMessage]));
        }
      });
    } catch (error) {
      console.error("Error saving or broadcasting chat message:", error);
    }
  });

  // Handle WebSocket disconnection
  ws.on("close", () => {
    // Remove the WebSocket connection from the chat room's clients
    const clients = chatRoomClientsMap.get(id);
    if (clients) {
      clients.delete(ws);
      if (clients.size === 0) {
        chatRoomClientsMap.delete(id);
      }
    }
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("Failed to connect to MongoDB:", err);
});
