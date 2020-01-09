const express = require("express");
const router = new express.Router();
const Exam = require("../../models/Exam");


// router.get("/users", async (req, res, next) => {
//     try{
//         const users = await User.findById("5e0a1ad51c2cfa12a051bafd");
//         res.status(202).json({users});
//     }
//     catch(err){

//         res.status(500).json({err});
//     }
// })

// module.exports = router;
