import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  answer: { type: String, required: true },
  datetime: { type: Date, default: Date.now },
  user: { type: String, ref: "UserModel", required: true },
  question: { type: String, ref: "QuizQuestionModel", required: true },
  quiz: { type: String, ref: "QuizModel", required: true },
}, { collection: "answers" });

export default answerSchema;