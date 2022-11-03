import * as dotenv from "dotenv";
dotenv.config();
import Cors from "cors";
import express from "express";
import { dbConnect } from "./database/db.js";
import morgan from "morgan";

const PORT = process.env.API_PORT || 4001;
const app = express();
app.use(express.json());
app.use(Cors());
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.send("usuarios Api");
});

app.listen(PORT, () => {
  try {
    dbConnect();
  } catch (error) {
    console.error("No se pudo conectar a la base de datos:", error);
  }
  console.log("API running on port ", PORT);
});
