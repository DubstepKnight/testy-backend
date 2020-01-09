const mongoose = require("mongoose");
const ExamsTakenSchema = {
    examId: mongoose.Schema.Types.ObjectId,
    points: Number,
    takenAt: Date
}
const schema = new mongoose.Schema({
    username: {
        type: String,
        unique: true, 
        required: true
    },
    password: {
        type: String,
        required: true,
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
