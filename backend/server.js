import express from "express";
import cors from "cors";
import usersRouter from "./src/routes/users.js";
import groupsRouter from "./src/routes/groups.js";
// import channelsRouter from "./src/routes/channels.js";
import youtubeRouter from "./src/routes/youtube.js";

const app = express();

app.use(
  cors({
    origin: "https://myyoudule.onrender.com",
    credentials: true,
  })
);

app.use(express.json());

// 라우터 연결
app.use("/users", usersRouter);
app.use("/groups", groupsRouter);
// app.use("/api/channels", channelsRouter);
app.use("/youtube", youtubeRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.get("/healthz", (req, res) => {
  res.status(200).send("OK");
});
