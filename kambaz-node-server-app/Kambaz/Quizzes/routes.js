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


  const getQuestionSet = async (req, res) => {
    const questionSet = await questionDao.findQuestionSetByQuizId(req.params.qid);
    res.json(questionSet);
  };
  app.get("/api/quizzes/:qid/questions", getQuestionSet);

  const createQuestion = async (req, res) => {
    const newQuestion = await questionDao.createQuestion(req.body);
    res.json(newQuestion);
  };
  app.post("/api/quizzes/:qid/questions", createQuestion);

  const updateQuestion = async (req, res) => {
    const status = await questionDao.updateQuestion(req.params.qid, req.body);
    res.json(status);
  };
  app.put("/api/questions/:qid", updateQuestion);

  const deleteQuestion = async (req, res) => {
    const status = await questionDao.deleteQuestion(req.params.qid);
    res.json(status);
  };
  app.delete("/api/questions/:qid", deleteQuestion);

  const getQuestionById = async (req, res) => {
    const question = await questionDao.findQuestionById(req.params.qid);
    if (question) {
      res.json(question);
    } else {
      res.status(404).json({ error: "Question not found" });
    }
  };
  app.get("/api/questions/:qid", getQuestionById);

}