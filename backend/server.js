import express from "express";
import cors from "cors";
import usersRouter from "./src/routes/users.js";
import groupsRouter from "./src/routes/groups.js";
// import channelsRouter from "./src/routes/channels.js";
import youtubeRouter from "./src/routes/youtube.js";

const app = express();

app.use(cors({
  origin: "https://myyoudule.onrender.com",
  credentials: true
}));

app.use(express.json());

// 라우터 연결
app.use("/api/users", usersRouter);
app.use("/api/groups", groupsRouter);
// app.use("/api/channels", channelsRouter);
app.use("/api/youtube", youtubeRouter);

app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});
