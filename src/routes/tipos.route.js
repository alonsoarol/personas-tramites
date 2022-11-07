import express, { json } from "express";
import Tipos from "../models/tipos.model.js";

export const tiposRouter = express.Router();

tiposRouter.get("/tipos", async (req, res) => {
  const tipos = await Tipos.find();
  if (tipos.length < 3) {
    Tipos.insertMany([
      { tipo: "familiar" },
      { tipo: "empresa" },
      { tipo: "particular" },
    ]);
  }
  res.json(await Tipos.find());
});
