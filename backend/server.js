import express from "express";
import cors from "cors";
import usersRouter from "./src/routes/users.js";
import groupsRouter from "./src/routes/groups.js";
// import channelsRouter from "./routes/channels.js";
// import youtubeRouter from "./routes/youtube.js";

const app = express();
app.use(cors());
app.use(express.json());

// 라우터 연결
app.use("/api/users", usersRouter);
app.use("/api/groups", groupsRouter);
// app.use("/api/channels", channelsRouter);
// app.use("/api/youtube", youtubeRouter);

app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});
