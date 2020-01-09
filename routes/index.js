const v1 = require("./v1/User");
module.exports = (app) => {

    app.use("/v1", v1);
}