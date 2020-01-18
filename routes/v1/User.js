const express = require("express");
const router = new express.Router();
const User = require("../../models/User");
const crypto = require("crypto");

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
    console.log('UserPassword = '+userpassword);
    console.log('Passwordhash = '+passwordData.passwordHash);
    console.log('nSalt = '+passwordData.salt);
    return passwordData;
}

// router.get("/users", async (req, res, next) => {
//     console.log(req);
//     try{
//         const users = await User.find();
//         res.status(202).json({users});
//     }
//     catch(err){
//         console.log(err);
//         res.status(500).json({err}).send({
//             message: "Internal server error"
//         });
//     }
// })

router.post("/users/register", async (req, res, next) => {

    // console.log(req);
    try{
        let password = req.body.password;

        // let hashedPassword = crypto.createHmac('sha512', password).update("anything").digest("hex");
        let hashedPassword = saltHashPassword(password);


        console.log(hashedPassword);
        let hashedPasswordBody = {
            ...req.body,
            password: hashedPassword.passwordHash.concat(hashedPassword.salt)
        }
        console.log(hashedPasswordBody);
        const user = await User.create(hashedPasswordBody);
        res.status(202).json({user});
        // console.log(res);
    } 
    catch(err){
        res.status(500).json({err});
        console.log(err);
    }
})

router.post("/users/login", async (req, res, next) => {
    // console.log("req.body: " +req.body);
    try {
        const user = await User.find({username: req.body.username });
        // user is an array, remember that
        // console.log(user[0]);
        // console.log(req.body.password);
        let salt = user[0].password.slice(-16);
        // console.log("salt: "+salt);
        let hashAndSalt = sha512(req.body.password, salt);
        let hashCheck = hashAndSalt.passwordHash;
        let hashChecked = hashCheck.concat(salt);
        console.log(hashChecked);
        console.log("____");
        console.log(user[0].password);
        // console.log(hashCheck);
        // console.log(hashAndSalt.passwordHash);
        if ( hashChecked === user[0].password ) {
            console.log("correct");
            res.status(202).json({user});
        } else {
            console.log("incorrect");
            res.sendStatus(401);
        }
        // console.log("user = "  + user[0].salt);
        // console.log(user[0]);
    }
    catch(err) {
        res.status(500).json({err});
        console.log(err);
    }
})

module.exports = router;
