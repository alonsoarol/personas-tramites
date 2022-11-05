import mongoose from "mongoose";

const { Schema } = mongoose;
const TramiteSchema = new Schema({
  descripcion: { type: String, required: true },
  fecha_de_alta: { type: Date, requiered: true },
  fecha_de_cierre: {type: Date, requiered: true },
  dni: { type: String, requiered: true },
  tipo: {type: String, required: true},
});

export default mongoose.model("Tramite", TramiteSchema);
