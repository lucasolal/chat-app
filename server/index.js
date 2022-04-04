const db = require("../db/db");
const express = require("express");
const path = require("path");
const app = express();

let loggedUsers = [];

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "content-type");
  next();
});

const bodyParser = require("body-parser");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const { sendfile } = require("express/lib/response");
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const PORT = process.env.PORT || 3001;

const loginUser = (user_id, username, image_url) => {
  userOnList = loggedUsers.find((user) => user.user_id === user_id);
  if (userOnList) userOnList.instances += 1;
  else
    loggedUsers.push({
      user_id,
      username,
      image_url,
      instances: 1,
    });
};

const logoutUser = (user_id) => {
  userOnList = loggedUsers.find((user) => user.user_id === user_id);
  if (!userOnList) return false;
  if (userOnList.instances > 1) userOnList.instances -= 1;
  else loggedUsers = loggedUsers.filter((user) => user.user_id !== user_id);
  return true;
};

io.on("connection", (socket) => {
  console.log("A client has connected");
  console.log(loggedUsers);
  socket.on("sendingMessage", async (message, user_id, username) => {
    console.log("receiving message: " + message + " from " + username);
    await db.sendMessage(user_id, username, message);
    const messages = await db.getMessages();
    io.emit("sendingMessages", messages);
    console.log("done sending message");
  });

  socket.on("requestingMessages", async () => {
    console.log("messages being requested");
    const messages = await db.getMessages();
    socket.emit("sendingMessages", messages);
    console.log("requested messages have been sent");
  });

  socket.on("login", (user_id, username, image_url) => {
    socket.user_id = user_id;
    console.log("user logging in: " + user_id);
    loginUser(user_id, username, image_url);

    io.emit("updateUsers", loggedUsers);
    console.log(`${user_id} has finishedlogged in`);
    console.log(loggedUsers);
  });

  socket.on("logout", (user_id) => {
    console.log("user requesting to log out: " + user_id);
    if (logoutUser(user_id)) {
      io.emit("updateUsers", loggedUsers);
      console.log(`${user_id} has finished logging out`);
    } else console.log(`${user_id} was not logged in`);
    console.log(loggedUsers);
  });

  socket.on("requestingUsers", () => {
    console.log("user list is being requested");
    socket.emit("updateUsers", loggedUsers);
    console.log("user list sent");
  });

  socket.on("disconnect", (reason) => {
    const user_id = socket.user_id;
    if (socket.user_id) {
      const loggedUser = loggedUsers.find((user) => user.user_id === user_id);
      if (!loggedUser) {
        console.log(
          "Tried to resolve a disconnection of a user not on the logged users list"
        );
        return;
      }
      logoutUser(user_id);
      console.log(`${loggedUser.user_id} disconnected`);
      io.emit("updateUsers", loggedUsers);
    }
  });

  socket.emit("updateUsers", loggedUsers);
});

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

const root = require("path").join(__dirname, "..", "client", "build");
app.use(express.static(root));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../", "client", "build", "index.html"));
});

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
