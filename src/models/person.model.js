import mongoose from "mongoose";

const { Schema } = mongoose;
const PersonSchema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, requiered: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.model("Person", PersonSchema);