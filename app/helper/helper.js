const jwt = require("jsonwebtoken");


exports.generateAccessToken = function(payload){
   // expires after half and hour (1800 seconds = 30 minutes)
    
   return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1800s' });
};

exports.getRequestToken = function(usertoken){
   const token = usertoken.split(' ');
   const decoded = jwt.verify(token[1], process.env.ACCESS_TOKEN_SECRET);
   return decoded;
};