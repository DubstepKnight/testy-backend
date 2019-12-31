const mongoose = require("mongoose");
const ExamsTakenSchema = {
    examId: mongoose.Schema.Types.ObjectId,
    points: Number,
    takenAt: Date
}
const schema = new mongoose.Schema({
    type: String,
    username: {
        type: String,
        unique: true
    },
    password: String,
    examsTaken: [ExamsTakenSchema]
});

const model = new mongoose.model("User", schema);
module.exports = model;
