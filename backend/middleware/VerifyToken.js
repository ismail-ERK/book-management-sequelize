const jwt = require('jsonwebtoken');
const db = require("../db/db-config");
module.exports = function(req,res,next){
    const token = req.header('auth-token');
    console.log('token : '+token)
    if(!token) return res.status(401).send('Access Denied');
    try {
        const verified = jwt.verify(token,process.env.TOKEN_SECRET);
        console.log("verified : ",verified.email)
        req.user = verified;

        next()
    }catch (err){
        res.send(400).send('Invalid Token')
    }
}
