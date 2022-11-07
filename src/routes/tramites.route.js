import express, { json } from "express";
import Tramite from "../models/tramite.model.js";
import Persona from "../models/persona.model.js";
import Tipos from "../models/tipos.model.js";
import { tramiteValidateCreate } from "../validators/tramite.js";

export const tramiteRouter = express.Router();

tramiteRouter.get("/tramites", async (req, res) => {
  const tramites = await Tramite.find();
  await Tipos.populate(tramites, { path: "tipo" }, async () => {
    await Persona.populate(tramites, { path: "persona" }, () => {
      res.json(tramites);
    });
  });
});

tramiteRouter.get("/tramite/:id", async (req, res) => {
  const tramite = await Tramite.findById({ _id: req.params.id });
  await Persona.populate(tramite, { path: "persona" }, () => {
    res.json(tramite);
  });
});

tramiteRouter.post("/tramite", tramiteValidateCreate, async (req, res) => {
  const { descripcion, fecha_de_alta, fecha_de_cierre, tipo, dni_persona } =
    req.body;
  const tipoId = await Tipos.findOne({ tipo: tipo });
  const existePersona = await Persona.findOne({ dni: dni_persona });
  if (!tipoId) {
    res.send("El tipo ingresado no existe");
  }
  if (!existePersona) {
    res.send("El dni ingresado no existe");
    return;
  }
  const nuevoTramite = new Tramite({
    descripcion,
    fecha_de_alta,
    fecha_de_cierre,
    tipo: tipoId._id,
    dni_persona,
    persona: existePersona.id,
  });
  await nuevoTramite.save();
  res.status(200).send("tramite registrado correctamente");
});

tramiteRouter.put("/tramite/:id", async (req, res) => {
  const { descripcion, fecha_de_alta, fecha_de_cierre, tipo, dni_persona } =
    req.body;
  let persona;
  let tipos;
  if (tipo) {
    tipos = await Tipos.findOne({ tipo: tipo });
    if (!tipos) {
      res.send("El tipo ingresado no existe");
      return;
    }
  }
  if (dni_persona) {
    persona = await Persona.findOne({ dni: dni_persona });
    if (!persona) {
      res.send("El dni ingresado no existe");
      return;
    }
  }
  await Tramite.updateOne(
    { _id: req.params.id },
    {
      $set: {
        descripcion,
        fecha_de_alta,
        fecha_de_cierre,
        tipo: tipos && tipos.id,
        dni_persona,
        persona: persona && persona.id,
      },
    }
  );
  res.status(200).send("tramite modificado correctamente");
});

tramiteRouter.delete("/tramite/:id", async (req, res) => {
  await Tramite.deleteOne({ _id: req.params.id });
  res.status(200).send("tramite eliminado correctamente");
});
