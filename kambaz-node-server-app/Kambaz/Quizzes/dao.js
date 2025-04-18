import model from "./model.js";
import { v4 as uuidv4 } from 'uuid';

export function findQuizzesForCourse(courseId) {
  return model.find({ course: courseId });
}
export function createQuiz(quiz) {
  const newQuiz = { ...quiz, _id: uuidv4() };
  return model.create(newQuiz);
}
export function deleteQuiz(quizId) {
  return model.deleteOne({ _id: quizId });
}
export function updateQuiz(quizId, quizUpdates) {
  return model.updateOne({ _id: quizId }, quizUpdates);
}
export function togglePublishQuiz(quizId) {
  const quiz = model.findById(quizId);
  const newPublished = quiz.published === "true" ? "false" : "true";
  return model.findByIdAndUpdate(
    quizId,
    { $set: { published: newPublished } },
  );
}
export function updateQuizScore(quizId, username, newScore) {
  return model.updateOne(
    { _id: quizId },
    {
      $push: { [`score.${username}`]: newScore },
      $inc: { [`userAttempts.${username}`]: 1 },
    }
  );
}