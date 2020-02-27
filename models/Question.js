const mongoose = require("mongoose");

const OptionSchema = {
    option: {
        type: String,
        required: true
    },
    isCorrect: {
        type: Boolean,
        required: true
    }
}

const schema = new mongoose.Schema({
    question:  {
        type: String,
        required: true
    },
    points: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    options: {
        type: [OptionSchema],
        required: true
    }
})

const model = new mongoose.model("Question", schema);
module.exports = model;
