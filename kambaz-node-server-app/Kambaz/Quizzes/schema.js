import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
    _id: String,
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
    untilDate: String,
    published: String,
    score: {
        type: Map,
        of: Number
      },
    course: { type: String, ref: "CourseModel" },

},
    { collection: "quizzes" }
);
export default quizSchema;