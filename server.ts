import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./src/routes/routes";
import { initializeCards } from "./src/utils/initializeCards";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api", router);

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/solplay";

mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log("Connected to MongoDB");
    // Initialize cards when server starts
    await initializeCards();
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });