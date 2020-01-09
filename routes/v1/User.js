const express = require("express");
const router = new express.Router();
const User = require("../../models/User");

router.get("/users", async (req, res, next) => {
    try{
        const users = await User.findById("5e0a1ad51c2cfa12a051bafd");
        res.status(202).json({users});
    }
    catch(err){
        console.log(err);
        res.status(500).json({err});
    }
})

router.post("/users", async (req, res, next) => {
    console.log(req);
    // let test = {
    //     username: "testSubject",
    //     password: "123456789123",
    //     isTeacher: true,
    //     examsTaken: []
    // }
    try{
        // console.log(req);
        const user = await User.insertOne(req.body);
        res.status(202).json({user});
        // console.log(res);
    } 
    catch(err){
        res.status(500).json({err})
    }
})

module.exports = router;
