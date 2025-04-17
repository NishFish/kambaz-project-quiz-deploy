import mongoose from "mongoose";
import schema from "./schema.js";
const model = mongoose.model("QuizAnswerModel", schema);
export default model;