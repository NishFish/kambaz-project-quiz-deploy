import * as dao from "./dao.js";
import * as questionDao from "../Questions/dao.js";
import * as answerDao from "../Answers/dao.js"; // ✅ Add this

export default function QuizRoutes(app) {
  // --- Quiz Routes ---
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

  const publishQuiz = async (req, res) => {
    const status = await dao.publishQuiz(req.params.qid);
    res.json(status);
  };
  app.put("/api/quizzes/:qid/publish", publishQuiz);

  const unpublishQuiz = async (req, res) => {
    const status = await dao.unpublishQuiz(req.params.qid);
    res.json(status);
  };
  app.put("/api/quizzes/:qid/unpublish", unpublishQuiz);

  // --- Question Routes ---
  const createQuestion = async (req, res) => {
    const newQuestion = await questionDao.createQuestion(req.body);
    res.json(newQuestion);
  };
  app.post("/api/questions", createQuestion);

  const findQuestionById = async (req, res) => {
    const question = await questionDao.findQuestionById(req.params.qid);
    res.json(question);
  };
  app.get("/api/questions/:qid", findQuestionById);

  const findQuestionsByQuizId = async (req, res) => {
    const questions = await questionDao.findQuestionsByQuizId(req.params.quizId);
    res.json(questions);
  };
  app.get("/api/quizzes/:quizId/questions", findQuestionsByQuizId);

  const deleteQuestion = async (req, res) => {
    const status = await questionDao.deleteQuestion(req.params.qid);
    res.json(status);
  };
  app.delete("/api/questions/:qid", deleteQuestion);

  const updateQuestion = async (req, res) => {
    const status = await questionDao.updateQuestion(req.params.qid, req.body);
    res.json(status);
  };
  app.put("/api/questions/:qid", updateQuestion);

  // --- Answer Routes ---
  const createAnswer = async (req, res) => {
    const newAnswer = await answerDao.createAnswer(req.body);
    res.json(newAnswer);
  };
  app.post("/api/answers", createAnswer);

  const getAnswerById = async (req, res) => {
    const answer = await answerDao.getAnswerById(req.params.aid);
    res.json(answer);
  };
  app.get("/api/answers/:aid", getAnswerById);

  const getAnswersByQuizId = async (req, res) => {
    const answers = await answerDao.getAnswerByQuizId(req.params.qid);
    res.json(answers);
  };
  app.get("/api/quizzes/:qid/answers", getAnswersByQuizId);
}