import * as dao from "./dao.js";
import * as questionDao from "../QuizQuestions/dao.js";

export default function QuizRoutes(app) {
  app.put("/api/quizzes/:quizId", async (req, res) => {
    const { quizId } = req.params;
    const quizUpdates = req.body;
    const status = await dao.updateQuiz(quizId, quizUpdates);
    res.send(status);
  });

  app.delete("/api/quizzes/:quizId", async (req, res) => {
    const { quizId } = req.params;
    const status = await dao.deleteQuiz(quizId);
    res.send(status);
  });

  app.get("/api/quizzes/:quizId/questions", async (req, res) => {
    const { quizId } = req.params;
    const questions = await questionDao.findQuestionsForQuiz(quizId);
    res.json(questions);
  });
  app.post("/api/quizzes/:quizId/questions", async (req, res) => {
    const { quizId } = req.params;
    const question = {
      ...req.body,
      quiz: quizId,
    };
    const newQuestion = await questionDao.createQuestion(question);
    res.send(newQuestion);
  });

}