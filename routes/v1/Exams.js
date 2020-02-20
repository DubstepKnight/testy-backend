const express = require("express");
const router = new express.Router();
const Exam = require("../../models/Exam");
const isAuth = require("../../middleware/isAuth");

router.post("/exams", isAuth.authenticate("jwt", {session: false} ), async (req, res) =>{
    console.log(req.body);
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

router.get("/exams/:id", isAuth.authenticate("jwt", {session: false} ), (req, res) =>{
    try {
        console.log("It managed");
    }
    catch(error) {
        console.log("There is your error");
    }
})

module.exports = router;
