// Verifier si l'utilisateur est un admin ou pas

const jwt = require('jsonwebtoken');
const db = require("../db/db-config");
module.exports = function(req,res,next){
    const token = req.header('auth-token');
    console.log('token : '+token)
    if(!token) return res.status(401).send('Access Denied');

        try {
            const verified = jwt.verify(token,process.env.TOKEN_SECRET);
            req.user = verified;

            db.users.findAll({where: {email: req.user.email}})
                .then(ress=>{
                    if(ress[0].dataValues.role!=="ADMIN"){
                        console.log()
                        res.status(403).send("Access Denied")
                    }else {
                        next()
                    }
                })

    }catch (err){
        res.send(400).send('Invalid Token')
    }
}
