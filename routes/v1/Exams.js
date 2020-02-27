const express = require("express");
const router = new express.Router();
const Exam = require("../../models/Exam");
const User = require("../../models/User");
const isAuth = require("../../middleware/isAuth");
const isTeacher = require("../../middleware/isTeacher");

router.post("/exams", 
            isAuth.authenticate("jwt", {session: false} ),
            isTeacher, 
            async (req, res) =>{
        console.log(req.body);
        console.log("isRandom: ", req.body.isRandom);
        try {
            let newExam = await Exam.create(req.body);
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
    try {
        let examBeingTaken = await Exam.findById(examId);
        examBeingTaken.examsTaken.push(takenExamData);
        let updatedExam = await examBeingTaken.save();
        let examTaker = await User.findById(takenExamData.takenBy);
        let acquredPoints = takenExamData.questions.filter(question => question.answer === question.rightAnswer).reduce(
            (accumulator, currentValue) => accumulator + currentValue.questionValue, 0);
        console.log("acquredPoints: ", acquredPoints);
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

router.get("/exams/history/:userId",
           isAuth.authenticate("jwt", {session: false} ),
           async (req, res) => {
    console.log("it gets to exams/history");
    try {
        console.log(req.parms.userId);
    }
    catch (error) {
        console.log(error);
        res.send(error).status(400);
    }
})

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

module.exports = router;
