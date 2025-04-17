import mongoose from "mongoose";

const choiceSchema = new mongoose.Schema({
  text: String,
  isCorrect: Boolean,
}, { _id: false });

const questionSchema = new mongoose.Schema({
  _id: String,
  name: String, 
  type: {
    type: String,
    enum: ["MULTIPLE_CHOICE", "FILL_IN_THE_BLANK", "TRUE_FALSE"],
    required: true,
  },
  question: { type: String, required: true }, 

  choices: [choiceSchema],
  blanks: [String],
  isCorrect: Boolean,

  points: Number,

  quiz: { type: String, ref: "QuizModel" },
}, { collection: "questions" });

export default questionSchema;