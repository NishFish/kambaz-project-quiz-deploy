import model from "./model.js";
import { v4 as uuidv4 } from 'uuid';

export const createAnswer = (answer) => {
    const newAnswer = { ...answer, _id: uuidv4() };
    return model.create(newAnswer);
}
export const getAnswerById = (answerId) => model.findById(answerId);
export const getAnswerByQuizId = (quizId) => model.find({ quiz_id: quizId });