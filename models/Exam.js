const mongoose = require("mongoose");

const questionForExamTaken = {
    question: [{type: mongoose.Schema.Types.ObjectId, ref: 'Question'}],
    answer: String,
    points: Number
}

const examsTaken = {
   questions: [questionForExamTaken],
   accessed: Boolean
}
const schema = new mongoose.Schema({
    isRandom: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type: Date
    },
    questions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Question'}],
    category: String,
    examsTaken: [examsTaken]
});

const model = new mongoose.model("Exam", schema);
module.exports = model;
