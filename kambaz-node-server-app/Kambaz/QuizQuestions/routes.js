import * as dao from "./dao.js";

export default function QuestionRoutes(app) {
    app.put("/api/questions/:questionId", async (req, res) => {
        const { questionId } = req.params;
        const questionUpdates = req.body;
        const status = await dao.updateQuestion(questionId, questionUpdates);
        res.send(status);
    });

    app.delete("/api/questions/:questionId", async (req, res) => {
        const { questionId } = req.params;
        const status = await dao.deleteQuestion(questionId);
        res.send(status);
    });

    app.put("/api/questions/:questionId", async (req, res) => {
        const { questionId } = req.params;
        const { username, newScore } = req.body
        const status = await dao.updateQuestionScore(questionId, username, newScore);
        res.send(status);
    });
}