import mongoose from "mongoose";
const { Schema } = mongoose;

const choiceSchema = new Schema({
  text: { type: String, required: true },
  isCorrect: { type: Boolean, required: true }
}, { _id: false });

const questionSchema = new Schema({
  id: { type: String, required: true },
  type: { type: String, enum: ["Multiple Choice", "True/False", "Fill in the Blank"], required: true },
  name: { type: String, required: true },
  question: { type: String, required: true },
  choices: { type: [choiceSchema], default: undefined },
  blanks: { type: [String], default: undefined },
  isCorrect: { type: Boolean, default: undefined },
  points: { type: Number, required: true },
  latestAnswers: { type: Map, of: Schema.Types.Mixed, default: {} }
}, { _id: false });

const questionSetSchema = new Schema({
  _id: { type: String, required: true },
  quiz: { type: String, ref: "QuizModel", required: true },
  questions: { type: [questionSchema], default: [] }
}, {
  collection: "questions"
});

export default questionSetSchema;
