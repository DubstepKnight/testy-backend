const express = require("express");
const router = new express.Router();
const User = require("../../models/User");
const crypto = require("crypto");

router.get("/users", async (req, res, next) => {
    console.log(req);
    try{
        const users = await User.find();
        res.status(202).json({users});
    }
    catch(err){
        console.log(err);
        res.status(500).json({err}).send({
            message: "Internal server error"
        });
    }
})

router.post("/users", async (req, res, next) => {
    // console.log(req);
    try{
        // console.log(req);
        console.log("body",req.body);
        // let hashedPassword = crypto.createHmac('sha256', req.body.password).update().final();
        // console.log(hashedPassword);
        const user = await User.create(req.body);
        res.status(202).json({user});
        // console.log(res);
    } 
    catch(err){
        res.status(500).json({err});
        console.log(err);
    }
})

// router.get("/users/login")

module.exports = router;
