import model from "./model.js";
import { v4 as uuidv4 } from 'uuid';

export const createQuiz = (quiz) => {
    const newQuiz = { ...quiz, _id: uuidv4() };
    return model.create(newQuiz);
}

export const deleteQuiz = (quizId) => model.deleteOne({ _id: quizId });
export const findAllQuizzesFromCourse = (courseId) => model.find({ course: courseId });
export const findQuizById = (quizId) => model.findOne({ _id: quizId });
export const updateQuiz = (quizId, quizUpdates) => model.updateOne({ _id: quizId }, { $set: quizUpdates });
export const togglePublishQuiz = async (quizId) => {
    const quiz = await model.findById(quizId);
    if (!quiz) throw new Error("Quiz not found");
  
    const currentStatus = quiz.published === "true";
    const newStatus = !currentStatus;
  
    return model.updateOne(
      { _id: quizId },
      { $set: { published: newStatus.toString() } }
    );
  };
