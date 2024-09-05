const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require('./models/UserModel')

const userRoutes = require("./routes//userRoute");
const postRoutes = require("./routes/postRoute");
const commentRoutes = require("./routes/commentRoute");
const followRoutes = require("./routes/followRoute");
const messageRoutes = require("./routes/messageRoute");
const notificationRoutes = require("./routes/notificationRoute");
const friendRoutes = require("./routes/friendRoute");
const tagRoutes = require("./routes/tagRoute");
const likeRoutes = require("./routes/likeRoute");
const {resolve} = require("path");
const {existsSync, mkdirSync} = require("fs");

const app = express();

app.use(cors());
app.use(express.json());

const imagesDir = resolve(__dirname, "../Frontend/public/images");
if (!existsSync(imagesDir)) {
    mkdirSync(imagesDir, { recursive: true });
}

app.use("/images", express.static(imagesDir));

mongoose
    .connect(
        "mongodb+srv://manhtruong227:truong123456@cluster0.q0inivp.mongodb.net/ownerWebBackend",
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => {
        console.log("MongoDB Connected to Booking");
    })
    .catch((err) => console.error("MongoDB connection error:", err));



// Sử dụng các routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/follows", followRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/friends", friendRoutes);
app.use("/api/tags", tagRoutes);
app.use("/api/likes", likeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
