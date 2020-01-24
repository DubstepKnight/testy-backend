const v1 = require("./v1/User", "./v1/Exam");
module.exports = (app) => {
    app.use("/v1", v1);
}