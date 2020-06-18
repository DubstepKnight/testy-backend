const express = require("express");
const router = new express.Router();
const Exam = require("../../models/Exam");
const User = require("../../models/User");
const Question = require("../../models/Question");
const isAuth = require("../../middleware/isAuth");
const isTeacher = require("../../middleware/isTeacher");

router.post("/exams", 
            isAuth.authenticate("jwt", {session: false}),
            isTeacher, 
            async (req, res) =>{
        // console.log('body: ', req.body);
        // console.log('header: ', req.body.headers);
        // console.log("isRandom: ", req.body.isRandom);
        let exam = req.body;
        try {
            console.log('exam: ', exam);
            // if ( req.body.isRandom ) {
            //     let numberOfQuestions = parseInt(req.body.numberOfQuestionsIfRandom, 10);
            //     // console.log('numberOfQuestions: ', numberOfQuestions);
            //     let randomizedQuestions = await Question.aggregate([{$sample: {size: numberOfQuestions}}])
            //     // console.log('randomizedQuestions: ', randomizedQuestions);
            //     let newRandomizedExam = {
            //         ...exam,
            //         ...await Exam.create(randomizedQuestions)
            //     };
            //     console.log('newRandomizedExam: ', newRandomizedExam);
            //     res.send(randomizedQuestions);
            // } else {
                let newExam = await Exam.create(exam);
                console.log(newExam);
                res.send(newExam).status(201);
        }
        catch(error) {
            console.log(error);
            res.send(error);
        }
})

router.post("/exams/take", 
            isAuth.authenticate("jwt", {session: false} ), 
            async (req, res) =>{
    console.log(req.body);
    let examId = req.body.examId;
    let takenExamData = req.body.takenExamData;
    let username = req.user[0].username;
    console.log("username: ", username);
    try {
        let examBeingTaken = await Exam.findById(examId);
        examBeingTaken.examsTaken.push(takenExamData);
        console.log("examBeingTaken: ", examBeingTaken);
        console.log("examBeingTaken.examsTaken.takenBy: ", examBeingTaken.examsTaken);
        let updatedExam = await examBeingTaken.save();
        let examTaker = await User.findById(takenExamData.takenBy);
        let acquredPoints = takenExamData.questions.filter(question => question.answer === question.rightAnswer).reduce(
            (accumulator, currentValue) => accumulator + currentValue.questionValue, 0);
        let examHistoryData = {
            examId: examId,
            pointsGot: acquredPoints,
            maximumPoints: takenExamData.maximumPoints,
        }
        examTaker.examsTaken.push(examHistoryData);
        let updateHistory = await examTaker.save();
        let wholeResponse = {
            updatedExam,
            updateHistory
        };
        res.send(wholeResponse).status(201);
    }
    catch(error) {
        console.log(error);
        res.send(error);
    }
})

router.get("/exams", isAuth.authenticate("jwt", {session: false} ), async (req, res, next) => {
    try{
        const exams = await Exam.find();
        console.log(exams);
        res.status(202).json({exams});
    }
    catch(err){
        console.log(err);
        res.status(500).json({err});
    }
});

router.get("/exams/:id", isAuth.authenticate("jwt", {session: false} ), async (req, res) =>{
    let examId = req.params.id;
    // console.log(examId);
    try {
        const oneExam = await Exam.findById(examId);
        // console.log(oneExam);
        res.send(oneExam).status(200);
        // console.log("It managed");
    }
    catch(error) {
        console.log(error);
        res.send(error);
    }
});

router.put("/exams/:id", 
          isAuth.authenticate("jwt", {session: false} ),
          isTeacher,
          async (req, res) => {
    let examId = req.params.id;
    let editedExam = req.body;
    try {
        await Exam.findByIdAndUpdate(
            examId,
            editedExam,
            {new: true}
        )
        // console.log(oneQuestion);
        res.send(editedExam).status(200);
    }
    catch(error) {
        console.log(error);
        res.send(error).status(500);
        console.log("There is your error");
    }
});

router.delete("/exams/:id", 
             isAuth.authenticate("jwt", {session: false} ), 
             isTeacher, 
             async (req, res) =>{
    let examId = req.params.id;
    try {
       const oneExam = await Exam.findByIdAndDelete(examId);
       console.log(oneExam);
       res.send(oneExam).status(200)
    }
    catch(error) {
        console.log(error);
        res.send(error).status(500);
    }
});

router.get("/exams/:id/history/",
           isAuth.authenticate("jwt", {session: false} ),
           isTeacher,
           async (req, res) => {
    let examId = req.params.id;
    console.log("it gets to exams/history");
    try {
        console.log(req.params.id);
        let historyOfOneExam = await Exam.findById(examId);
        console.log(historyOfOneExam.examsTaken);
        res.send(historyOfOneExam.examsTaken).status(200);
    }
    catch (error) {
        console.log(error);
        res.send(error).status(400);
    }
})

router.get("/exams/history/:userId",
           isAuth.authenticate("jwt", {session: false} ),
           isTeacher,
           async (req, res) => {
    console.log("it gets to exams/history");
    try {
        console.log(req.params.userId);
    }
    catch (error) {
        console.log(error);
        res.send(error).status(400);
    }
})

module.exports = router;
