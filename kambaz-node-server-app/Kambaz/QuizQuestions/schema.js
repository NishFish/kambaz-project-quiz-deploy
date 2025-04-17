import mongoose from "mongoose";

const choiceSchema = new mongoose.Schema({
  text: String,
  isCorrect: Boolean,
}, { _id: false });

const questionSchema = new mongoose.Schema({
  questionId: String,
  type: {
    type: String,
    enum: ["Multiple Choice", "True/False", "Fill in the Blank"],
    required: true,
  },
  name: String,
  question: { type: String, required: true },

  // Optional fields depending on type
  choices: [choiceSchema],
  blanks: [String],
  isCorrect: Boolean,

  points: Number,

  latestAnswers: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
    default: {},
  }
}, { _id: false });

const questionSetSchema = new mongoose.Schema({
  _id: String,
  quiz: { type: String, ref: "QuizModel" },
  questions: [questionSchema],
}, { collection: "questions" });

export default questionSetSchema;