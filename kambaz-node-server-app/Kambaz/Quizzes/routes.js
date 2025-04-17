import * as dao from "./dao.js";
import * as questionDao from "../QuizQuestions/dao.js";
import * as answerDao from "../QuizAnswers/dao.js";

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


  /*
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
    console.log(
      "here"
    )
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
  */
}