import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
    _id: String,
    course: { type: String, ref: "CourseModel" },
    title: String,
    quizType: String,
    assignmentGroup: String,
    points: Number,
    numberOfQuestions: Number,
    shuffleAnswers: String,
    timeLimit: String,
    multipleAttempts: String,
    howManyAttempts: Number,
    showCorrectAnswers: String,
    accessCode: String,
    oneQuestionAtATime: String,
    webcamRequired: String,
    lockQuestionsAfterAnswering: String,
    dueDate: String,
    availableDate: String,
    availableUntilDate: String,
    published: String,
    score: {},
    userAttempts: {},

},
    {
        collection: "quizzes"
    });

export default quizSchema;
