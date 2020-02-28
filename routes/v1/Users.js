const express = require("express");
const jwt = require("jsonwebtoken");
const jwtKey = require("../../jwtKey.json");
const router = new express.Router();
const User = require("../../models/User");
const crypto = require("crypto");
const isAuth = require("../../middleware/isAuth");

function generateToken(user) {
    const token = jwt.sign(
      {
        ...user,
      },
      jwtKey.key,
      { expiresIn: "7d" }
    );
    console.log(token);
    return token;
}

const genRandomString = (length) => {
    return crypto.randomBytes(Math.ceil(length/2))
            .toString('hex') // convert to hexadecimal format 
            .slice(0,length);   // return required number of characters 
};

const sha512 = (password, salt) => {
    let hash = crypto.createHmac('sha512', salt); // Hashing algorithm sha512
    hash.update(password);
    let value = hash.digest('hex');
    return {
        salt: salt,
        passwordHash: value
    };
};

const saltHashPassword = (userpassword) => {
    const salt = genRandomString(16); // Gives us salt of length 16
    const passwordData = sha512(userpassword, salt); 
    return passwordData;
}

router.post("/users/register",  async (req, res, next) => {

    // console.log(req);
    try{
        let password = req.body.password;

        // let hashedPassword = crypto.createHmac('sha512', password).update("anything").digest("hex");
        let hashedPassword = saltHashPassword(password);
        let hashedPasswordBody = {
            ...req.body,
            password: hashedPassword.passwordHash.concat(hashedPassword.salt)
        }
        const user = await User.create(hashedPasswordBody);
        res.status(202).json({user});
        // console.log(res);
    } 
    catch(err){
        res.status(500).json({err});
        console.log(err);
    }
})

router.post("/users/login",  async (req, res, next) => {
    // console.log("req.body: " +req.body);
    try {
        const user = await User.find({username: req.body.username });
        let salt = user[0].password.slice(-16);
        let hashAndSalt = sha512(req.body.password, salt);
        let hashCheck = hashAndSalt.passwordHash;
        let hashChecked = hashCheck.concat(salt);
        const userAndToken = {
            user,
            token: generateToken(user)
        }
        if ( hashChecked === user[0].password ) {
            console.log("correct");
            res.status(202).json({userAndToken});
        } else {
            console.log("incorrect");
            res.sendStatus(401);
        }
    }
    catch(err) {
        res.status(500).json({err});
        console.log(err);
    }
});

router.get("/users/history", isAuth.authenticate("jwt", {session: false} ), async (req, res) =>{
    // const token = req.headers["x-access-token"] || req.headers["authorization"];
    const userId = req.user[0]._id;
    // console.log("userId: ", userId);
    try {
        let checkingUser = await User.findById(userId);
        console.log(checkingUser);
        let allTakenExams = checkingUser.examsTaken;
        console.log(allTakenExams);
        res.send(allTakenExams).status(200);
    }
    
    catch (error) {
        console.log(error);
        res.send(error);
    }
})



module.exports = router;
