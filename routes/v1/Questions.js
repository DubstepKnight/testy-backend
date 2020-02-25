const express = require("express");
const router = new express.Router();
const isAuth = require("../../middleware/isAuth");
const isTeacher = require("../../middleware/isTeacher");
const Questions = require("../../models/Question");
const mongoose = require("mongoose");

router.post("/questions", 
            isAuth.authenticate("jwt", { session: false } ), 
            isTeacher,
            async (req, res) =>{
    console.log(req.body);
    try {
        let newQuestion =  await Questions.create(req.body);
        console.log(newQuestion);
        res.send(newQuestion).status(202);
    }
    catch(error) {
        console.log(error);
        res.send(error);
    }
});

router.get("/questions", isAuth.authenticate("jwt", { session: false } ), async (req, res) =>{
    if (req.body.questions) {
        console.log(req.body.questions);
        let questionIds = req.body.questions;
        try {
            let severalQuestions = await Questions.find({
                _id: { $in: questionIds}
            })
            console.log(severalQuestions);
            res.send(severalQuestions);
        }
        catch(error) {
            console.log(error);
            res.send(error);
        }
    } else {
        try {
            let allQuestions = await Questions.find();
            res.send(allQuestions).status(202);
        }
        catch(error) {
            console.log(error);
            res.send(error);
        }
    }
});

router.get("/questions/:id", isAuth.authenticate("jwt", { session: false } ), async (req, res) =>{
    console.log(req.params.id);
    let questionId = req.params.id;
    try {
        let oneQuestion = await Questions.findById(questionId);
        res.send(oneQuestion).status(202);
    }
    catch(error) {
        console.log(error);
        res.send(error);
    }
});

router.put("/questions/:id", 
            isAuth.authenticate("jwt", { session: false } ), 
            isTeacher,
            async (req, res) =>{
    // console.log(req.params.id);
    // console.log(req.body);
    let questionId = req.params.id;
    let editedQuestion = req.body;
    try {
        await Questions.findByIdAndUpdate(
            questionId,
            editedQuestion,
            {new: true}
        )
        // console.log(oneQuestion);
        res.send(editedQuestion).status(200);
    }
    catch(error) {
        res.send(error);
    }
});

router.delete("/questions/:id", 
            isAuth.authenticate("jwt", { session: false } ), 
            isTeacher,
            async (req, res) =>{
    console.log(req.params.id);
    let questionId = req.params.id;
    try {
        let oneQuestion = await Questions.findByIdAndDelete(questionId);
        res.send(oneQuestion).status(202);
    }
    catch(error) {
        console.log(error);
        res.send(error);
    }
});


module.exports = router;