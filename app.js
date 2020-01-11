const express = require("express");
const app = express();
const routes = require("./routes");
app.use(express.json());
routes(app);

const mongoose = require("mongoose");
(async _ => {

    try{

        const pass = "XrPsSQ83OHqrstR7";
        const uri = `mongodb+srv://admin:${pass}@cluster0-3t6x5.mongodb.net/ExamPlatform?retryWrites=true&w=majority`;
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("mongodb is connected ...");
    }
    catch(e){
        console.log(e);
    }
})();
module.exports = app;