// const jwt = require("jsonwebtoken");
// const jwtKey = "BWWbCs!|W;e*oU.YWA_W+6jposJGR-";

// module.exports = (req, res, next) => {
//   //get the token from the header if present
//   const token = req.headers["x-access-token"] || req.headers["authorization"];
//   //if no token found, return response (without going to the next middelware)
//   if (!token) return res.status(401).send("Access denied. No token provided.");
//   try {
//     //if can verify the token, set req.user and pass to next middleware
//     const decoded = jwt.verify(token, jwtKey);
//     req.user = decoded;
//     next();
//   } catch (ex) {
//     //if invalid token
//     console.log(ex);
//     res.status(400).send("Invalid token.");
//   }
// };

const passport = require("passport");
const jwtKey = require('../jwtKey.json');
const JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt;

const options = {}

// Extracts the JWT from the header of the request
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = jwtKey.key;

module.exports = passport.use(new JwtStrategy(options, (payload, done) => {
    // console.log("Processing JWT payload for token content:");
    // console.log(payload);
  
    /* Here you could do some processing based on the JWT payload.
    For example check if the key is still valid based on expires property.
    */
    // console.log("Accesses the JWT auth");
    const now = Date.now() / 1000;
    if(payload.exp > now) {
        // console.log("Passed an if statement in JWT auth");
        // console.log(payload);
        done(null, payload);
    } else /* expired */ {
        console.log("Did not pass an if statement in JWT auth");
        done(null, false);
    }
  }));