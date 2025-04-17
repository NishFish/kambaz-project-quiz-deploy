import model from "./model.js"; 
import { v4 as uuidv4 } from "uuid";

// Create a new question
export const createQuestion = (question) => {
  const newQuestion = { ...question, _id: question._id || uuidv4() };
  return model.create(newQuestion);
};

// Find a question by ID
export const findQuestionById = (qid) => model.findOne({ _id: qid });

// Find all questions by quiz ID
export const findQuestionsByQuizId = (quizId) => model.find({ quiz: quizId });

// Delete a question by ID
export const deleteQuestion = (qid) => model.deleteOne({ _id: qid });

// Update a question by ID
export const updateQuestion = (qid, questionUpdates) =>
  model.updateOne({ _id: qid }, { $set: questionUpdates });