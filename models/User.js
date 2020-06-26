const mongoose = require("mongoose");
const ExamsTakenSchema = {
    examId: mongoose.Schema.Types.ObjectId,
    examName: {
        type: String,
        required: true
    },
    correctAnswers: {
        type: Number,
        required: true
    },
    takenAt: {
       type: Date,
       default: Date.now
    }
}
const schema = new mongoose.Schema({
    username: {
        type: String,
        unique: true, 
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isTeacher: {
        type: Boolean,
        required: true
     },
    dateOfRegistration: {
        type: Date,
        default: Date.now
    },
    examsTaken: [ExamsTakenSchema]
});

const model = new mongoose.model("User", schema);
module.exports = model;
