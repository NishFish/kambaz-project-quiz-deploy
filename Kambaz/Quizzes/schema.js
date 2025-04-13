import mongoose from "mongoose";
const quizSchema = new mongoose.Schema({
    _id: String,
    title: String,
    quizType: String,
    assignmentGroup: String,
    points: Number,
    numberOfQuestions: Number,
    shuffleAnswers: Boolean,
    timeLimit: String,
    multipleAttempts: Boolean,
    howManyAttempts: Number,
    showCorrectAnswers: Boolean,
    accessCode: String,
    oneQuestionAtATime: Boolean,
    webcamRequired: Boolean,
    lockQuestionsAfterAnswering: Boolean,
    dueDate: String,
    availableDate: String,
    untilDate: String,
    published: Boolean,
    score: Number,
    course: { type: String, ref: "CourseModel" },

},
    { collection: "quizzes" }
);
export default quizSchema;