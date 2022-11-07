import mongoose from "mongoose";

const { Schema } = mongoose;
const PersonaSchema = new Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  email: { type: String, requiered: true },
  dni: { type: String, requiered: true },
  tel: { type: String, requiered: true },
  fecha_nacimiento: { type: String, requiered: true },
  fecha_registro: { type: Date, default: Date.now },
});

export default mongoose.model("Persona", PersonaSchema);
