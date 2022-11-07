import express, { json } from "express";
import Persona from "../models/persona.model.js";

export const personaRouter = express.Router();

personaRouter.get("/personas", async (req, res) => {
  const personas = await Persona.find();
  res.json(personas);
});

personaRouter.get("/persona/:id", async (req, res) => {
  const persona = await Persona.findById({ _id: req.params.id });
  res.json(persona);
});

personaRouter.post("/persona", async (req, res) => {
  const { nombre, apellido, email, dni, tel, fecha_nacimiento } = req.body;
  const userEmail = await Persona.findOne({ email: email });
  if (userEmail) {
    res.status(409).send("el email ya existe");
    return;
  }
  const nuevoUsuario = new Persona({
    nombre,
    apellido,
    email,
    dni,
    tel,
    fecha_nacimiento,
  });
  await nuevoUsuario.save();
  res.status(200).send("persona registrada");
});

personaRouter.put("/persona/:id", async (req, res) => {
  const { nombre, apellido, email, dni, tel, fecha_nacimiento } = req.body;
  await Persona.updateOne(
    { _id: req.params.id },
    { $set: { nombre, apellido, email, dni, tel, fecha_nacimiento } }
  );
  res.status(200).send("persona modificada correctamente");
});

personaRouter.delete("/persona/:id", async (req, res) => {
  await Persona.deleteOne({ _id: req.params.id });
  res.status(200).send("persona eliminada correctamente");
});
