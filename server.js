const express = require("express");
const app = express();
// const http = require("http").Server(app);
const path = require("path");
// const io = require("socket.io")(http);

// io.setMaxListeners("transports", ["websocket"]);

// connect the database
const connectDB = require("./config/db");
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
// is this needed?

// Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/todos", require("./routes/api/todos"));

// setting the static folder
// ~~~~~~~need to set up the frontend folder
if (process.env.NODE_ENV === "production") {
  app.use(
    express.static(path.join(__dirname, "client", "build", "index.html"))
  );
  //   app.use(express.static("client/build"));
  //   app.get("*", (req, res) => {
  //     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  //   });
}

// const io = socketio(app);

// app.get("/", (req, res) => res.send("API running"));

// Socket.io
// io.on("connection", (socket) => {
//   // Get the last 10 messages from the database.
//   Message.find()
//     .sort({ createdAt: -1 })
//     .limit(10)
//     .exec((err, messages) => {
//       if (err) return console.error(err);

//       // Send the last messages to the user.
//       socket.emit("init", messages);
//     });

//   // Listen to connected users for a new message.
//   socket.on("message", (msg) => {
//     // Create a message with the content and the name of the user.
//     const message = new Message({
//       content: msg.content,
//       name: msg.name,
//     });

//     // Save the message to the database.
//     message.save((err) => {
//       if (err) return console.error(err);
//       socket.emit("update", message);
//     });

//     // Message.find()
//     //   .sort({ createdAt: -1 })
//     //   .limit(1)
//     //   .exec((err, newMessage) => {
//     //     if (err) return console.error(err);
//     //     socket.emit("update", newMessage);
//     //     console.log(newMessage);
//     //   });

//     // Notify all other users about a new message.
//     // socket.broadcast.emit("push", msg);
//   });

//   socket.on("disconnect", () => console.log("client disconnected"));
// });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
