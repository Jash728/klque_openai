
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db.js";
import chatRoutes from "./routes/chatRoutes.js";
// import fetch from "node-fetch";
import path from "path";
const __dirname = path.resolve();
dotenv.config();


connectDB();

const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/chats", chatRoutes);
// app.use('/', express.static(path.join(__dirname, 'public')))



const PORT = process.env.PORT || 8081;


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
