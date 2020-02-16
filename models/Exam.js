const mongoose = require("mongoose");

const QuestionSchema = {
    question: String
}

const questionForExamTaken = {
    question: String,
    answer: String,
    points: Number
}
const examsTaken = {
   questions: [questionForExamTaken],
   accessed: Boolean
}
const schema = new mongoose.Schema({
    type: String,
    createdAt: Date,
    updatedAt: Date,
    questions: [QuestionSchema],
    category: String,
    name: String,
    examsTaken: [examsTaken]
});

const model = new mongoose.model("Exam", schema);
module.exports = model;
