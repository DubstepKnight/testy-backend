module.exports = (req, res, next) => {
  //get the token from the header if present
//   console.log("payload in isTeacher: ", req.body);
  const token = req.headers["x-access-token"] || req.headers["authorization"];
  //if no token found, return response (without going to the next middelware)
  if (!token) return res.status(401).send("Access denied. No token provided.");
    let isTeacherValue = req.user[0].isTeacher;
    // console.log(isTeacherValue);
    if (isTeacherValue === true) {
        next();
    } else {
        res.status(400).send("You are not a teacher. You do not have rights on this action.");
    }
}; 
