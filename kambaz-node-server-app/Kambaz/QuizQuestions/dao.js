import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

// Create a new question and add it to the question set
export const createQuestion = async (quizId, question) => {
  const newQuestion = {
    ...question,
    id: question.id || uuidv4(),
  };

  const existingSet = await model.findOne({ quiz: quizId });
  if (existingSet) {
    existingSet.questions.push(newQuestion);
    return existingSet.save();
  } else {
    // Create a new question set if it doesn't exist
    return model.create({
      _id: uuidv4(),
      quiz: question.quiz,
      questions: [newQuestion],
    });
  }
};

export const findQuestionSetByQuizId = async (quizId) => {
  return model.findOne({ quiz: quizId });
};

// Find a specific question by questionId across all sets
export const findQuestionById = async (qid) => {
  const result = await model.findOne({ "questions.id": qid });
  if (!result) return null;
  return result.questions.find(q => q.id === qid);
};

// Get all questions for a specific quiz
export const findQuestionsByQuizId = async (quizId) => {
  const set = await model.findOne({ quiz: quizId });
  return set ? set.questions : [];
};

// Delete a question from a set by questionId
export const deleteQuestion = async (qid) => {
  
  return model.updateOne(
    { "questions.id": qid },
    { $pull: { questions: { id: qid } } }
  );
};

// Update a question by questionId
export const updateQuestion = async (questionUpdates) => {
  console.log(questionUpdates.id)
  return model.updateOne(
    { "questions.id": questionUpdates.id },
    {
      $set: {
        "questions.$": {
          ...questionUpdates,
          id: questionUpdates.id, 
        }
      }
    }
  );
};

export const updateQuestionSet = async (quizId, newQuestions) => {
  return model.findOneAndUpdate(
    { quiz: quizId },
    { $set: { questions: newQuestions } },
    { new: true, upsert: true } 
  );
};