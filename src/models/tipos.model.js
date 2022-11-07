import mongoose from "mongoose";

const { Schema } = mongoose;
const TiposSchema = new Schema({
  tipo: { type: String, required: true },
});

export default mongoose.model("Tipos", TiposSchema);
