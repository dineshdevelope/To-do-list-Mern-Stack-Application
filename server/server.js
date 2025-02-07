import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/connectDB.js";
import userRoute from "./routes/user.route.js";
import taskRoute from "./routes/task.route.js";

const app = express();
dotenv.config();

connectDB();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", userRoute);
app.use("/tasks", taskRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server is Running On http://localhost:${process.env.PORT}`);
});
