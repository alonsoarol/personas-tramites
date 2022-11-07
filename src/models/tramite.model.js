import mongoose from "mongoose";

const { Schema } = mongoose;
const TramiteSchema = new Schema({
  descripcion: { type: String, required: true },
  fecha_de_alta: { type: String, requiered: true },
  fecha_de_cierre: { type: String, requiered: true },
  tipo: { type: Schema.Types.ObjectId, ref: "Tipos" },
  dni_persona: { type: String, required: true },
  persona: { type: Schema.Types.ObjectId, ref: "Persona" },
});

export default mongoose.model("Tramite", TramiteSchema);
