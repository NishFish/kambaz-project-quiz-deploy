import * as dao from "./dao.js";
import * as questionDao from "../QuizQuestions/dao.js";

export default function QuizRoutes(app) {
  const createQuiz = async (req, res) => {
    const newQuiz = await dao.createQuiz(req.body);
    res.json(newQuiz);
  };
  app.post("/api/quizzes", createQuiz);

  const deleteQuiz = async (req, res) => {
    const status = await dao.deleteQuiz(req.params.qid);
    res.json(status);
  };
  app.delete("/api/quizzes/:qid", deleteQuiz);

  const findQuizById = async (req, res) => {
    const quiz = await dao.findQuizById(req.params.qid);
    res.json(quiz);
  };
  app.get("/api/quizzes/:qid", findQuizById);

  const findAllQuizzesFromCourse = async (req, res) => {
    const quizzes = await dao.findAllQuizzesFromCourse(req.params.cid);
    res.json(quizzes);
  };
  app.get("/api/courses/:cid/quizzes", findAllQuizzesFromCourse);

  const updateQuiz = async (req, res) => {
    const quizId = req.params.qid;
    const updates = req.body;
    const status = await dao.updateQuiz(quizId, updates);
    res.json(status);
  };
  app.put("/api/quizzes/:qid", updateQuiz);

  const togglePublishQuiz = async (req, res) => {
    try {
      const status = await dao.togglePublishQuiz(req.params.qid);
      res.json(status);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  app.put("/api/quizzes/:qid/toggle-publish", togglePublishQuiz);

  

  const getQuestionSet = async (req, res) => {
    const questionSet = await questionDao.findQuestionSetByQuizId(req.params.qid);
    res.json(questionSet);
  };
  app.get("/api/quizzes/:qid/questions", getQuestionSet);

  const createQuestion = async (req, res) => {
    const quizId = req.params.qid;
    const newQuestion = await questionDao.createQuestion(quizId, req.body);
    res.json(newQuestion);
  };
  app.post("/api/quizzes/:qid/questions", createQuestion);

  const updateQuestion = async (req, res) => {
    const status = await questionDao.updateQuestion(req.body);
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

  const updateQuestionSet = async (req, res) => {
    const quizId = req.params.qid;
    const newQuestions = req.body.questions;
    try {
      const updatedSet = await questionDao.updateQuestionSet(quizId, newQuestions);
      if (updatedSet) {
        res.json(updatedSet);
      } else {
        res.status(404).json({ error: "Question set not found" });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  app.put("/api/quizzes/:qid/questions", updateQuestionSet);

}