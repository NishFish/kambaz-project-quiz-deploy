import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

// Create a new question and add it to the question set
export const createQuestion = async (question) => {
  const newQuestion = {
    ...question,
    questionId: question.questionId || uuidv4(),
  };

  const existingSet = await model.findOne({ _id: question._id });
  if (existingSet) {
    existingSet.questions.push(newQuestion);
    return existingSet.save();
  } else {
    // Create a new question set if it doesn't exist
    return model.create({
      _id: question._id,
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
  const result = await model.findOne({ "questions.questionId": qid });
  if (!result) return null;
  return result.questions.find(q => q.questionId === qid);
};

// Get all questions for a specific quiz
export const findQuestionsByQuizId = async (quizId) => {
  const set = await model.findOne({ quiz: quizId });
  return set ? set.questions : [];
};

// Delete a question from a set by questionId
export const deleteQuestion = async (qid) => {
  return model.updateOne(
    { "questions.questionId": qid },
    { $pull: { questions: { questionId: qid } } }
  );
};

// Update a question by questionId
export const updateQuestion = async (qid, questionUpdates) => {
  return model.updateOne(
    { "questions.questionId": qid },
    {
      $set: {
        "questions.$": {
          ...questionUpdates,
          questionId: qid, // ensure this stays consistent
        }
      }
    }
  );
};