import model from "./model.js";
import { updateQuiz } from '../Quizzes/dao.js';     // import the updateQuiz function
import { v4 as uuidv4 } from "uuid";

function calculateTotalPoints(questions) {
  return questions.reduce((sum, q) => sum + (q.points || 0), 0);
}
export const createQuestion = async (quizId, question) => {
  const newQuestion = {
    ...question,
    id: question.id || uuidv4(),
  };

  const existingSet = await model.findOne({ quiz: quizId });

  if (existingSet) {
    existingSet.questions.push(newQuestion);
    questionSet.markModified('questions');
    await existingSet.save();

    const totalPoints = calculateTotalPoints(existingSet.questions);

    await updateQuiz(quizId, {
      numberOfQuestions: existingSet.questions.length,
      points: totalPoints,
    });

    return existingSet;
  } else {
    const newSet = await model.create({
      _id: uuidv4(),
      quiz: question.quiz,
      questions: [newQuestion],
    });

    await updateQuiz(quizId, {
      numberOfQuestions: 1,
      points: newQuestion.points || 0,
    });

    return newSet;
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
  const questionSet = await model.findOne({ "questions.id": qid });
  if (!questionSet) return null;

  await model.updateOne(
    { "questions.id": qid },
    { $pull: { questions: { id: qid } } },
    { runValidators: true }
  );

  const updatedSet = await model.findOne({ quiz: questionSet.quiz });

  const totalPoints = updatedSet.questions.reduce((sum, q) => sum + (q.points || 0), 0);

  await updateQuiz(questionSet.quiz, {
    numberOfQuestions: updatedSet.questions.length,
    points: totalPoints,
  });

  return updatedSet;
};

export const updateQuestion = async (questionUpdates) => {
  const questionSet = await model.findOne({ "questions.id": questionUpdates.id });
  if (!questionSet) return null;

  await model.updateOne(
    { "questions.id": questionUpdates.id },
    { $set: { "questions.$": questionUpdates } },
    { runValidators: true }
  );

  const updatedSet = await model.findOne({ quiz: questionSet.quiz });

  const totalPoints = updatedSet.questions.reduce((sum, q) => sum + (q.points || 0), 0);
  const totalQuestions = updatedSet.questions.length;

  await updateQuiz(questionSet.quiz, {
    points: totalPoints,
    numberOfQuestions: totalQuestions,
  });

  return updatedSet;
};

export const updateQuestionSet = async (quizId, newQuestions) => {
  console.log("here")

  const questionSet = await model.findOne({ quiz: quizId });
  if (!questionSet) return null;

  const updatedSet = await model.findOneAndUpdate(
    { quiz: quizId },
    { $set: { questions: newQuestions } },
    { new: true, upsert: true, runValidators: true } 
  );

  const totalPoints = updatedSet.questions.reduce((sum, q) => sum + (q.points || 0), 0);
  const totalQuestions = updatedSet.questions.length;

  await updateQuiz(quizId, {
    points: totalPoints,
    numberOfQuestions: totalQuestions,
  });

  return updatedSet;

};