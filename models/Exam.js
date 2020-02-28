const mongoose = require("mongoose");

const questionForExamTaken = {
    question: {type: mongoose.Schema.Types.ObjectId, ref: 'Question'},
    answer: {
        type: String,
        required: true
    },
    rightAnswer: {
        type: String,
        required: true
    },
    questionValue: {
        type: Number,
        required: true
    }
}

const examTaken = {
   questions: [questionForExamTaken],
   takenBy: {
        userId: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User',
            required: true
        },
        username: {
            type: String,
            required: true
        }
    }
   
}

const schema = new mongoose.Schema({
    isRandom: {
        type: String,
        required: true
    },
    personalFor: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    numberOfQuestionsIfRandom: {
        type: Number
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
    maximumPoints: {
        type: Number,
        required: true
    },
    questions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Question'}],
    category: String,
    examsTaken: [examTaken]
});

const model = new mongoose.model("Exam", schema);
module.exports = model;
