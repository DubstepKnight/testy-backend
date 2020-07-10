const express = require("express");
const app = express();
const cors = require("cors");

// const routes = require("./routes");
const usersRoute = require("./routes/v1/Users");
const examsRoute = require("./routes/v1/Exams");
const questionsRoute = require("./routes/v1/Questions");

app.use(express.json());
app.use(cors());

// routes(app);

app.use("/v1", usersRoute);
app.use("/v1", examsRoute);
app.use("/v1", questionsRoute);

const mongoose = require("mongoose");
(async _ => {

    try{
        const pass = "XrPsSQ83OHqrstR7";
        const uri = `mongodb+srv://admin:${pass}@cluster0-3t6x5.mongodb.net/ExamPlatform?retryWrites=true&w=majority`;
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        // console.log("mongodb is connected ...");
    }
    catch(e){
        // console.log(e);
    }
})();
module.exports = app;