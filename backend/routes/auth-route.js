const db = require("../db/db-config");
const router = require('express').Router();
const cors = require("cors")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/refresh_token',cors(),async (req,res)=>{
    const refresh_token = req.header('refresh-token');
    if(!refresh_token) return res.status(401).send('Access Denied');
    let user = {}
    try {
        const verified = jwt.verify(refresh_token,process.env.TOKEN_SECRET);

        await  db.users.findAll({where: {email: verified.email}}).then(res=>{

            user = {...res[0].dataValues};
        })
        if(!user) return res.status(400).send('Email not found');

        //Create token
        //jwt.sign({information}, password pour securilte random)
        const token = jwt.sign({id: user.id,name: user.name, email: user.email,role: user.role, photo: user.photo},process.env.TOKEN_SECRET,{
            expiresIn: "20min",
        });
        res.header('auth-token', token).send({user,token});

    }catch (err){
        res.send(400).send('Invalid Token')
    }



})

router.post('/login',cors(),async (req,res)=>{

    const {email,password} = req.body;

    let user = {}
    await  db.users.findAll({where: {email: email}}).then(res=>{

        user = {...res[0].dataValues};
    })

    if(!user) return res.status(400).send('Email not found');

    const valiPass = await bcrypt.compare(password,user.password);
    if(!valiPass) return res.status(400).send('Invalid password');


    //Create token
    //jwt.sign({information}, password pour securilte random)
    const token = jwt.sign({id: user.id,name: user.name, email: email, role: user.role, photo: user.photo},process.env.TOKEN_SECRET,{
        expiresIn: "20min",
    });
    const refresh_token = jwt.sign({id: user.id,name: user.name, email: email,role: user.role, photo: user.photo},process.env.TOKEN_SECRET);
    res.header('refresh-token', refresh_token)
    res.header('auth-token', token).send({user,token,refresh_token});

})

router.post('/register',cors(),async (req,res)=>{

        console.log('register')

        const salt =await bcrypt.genSalt(10);
        const hashedPassword =await bcrypt.hash(req.body.password,salt);


        const user = {
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            role: 'USER',
            photo: 'avatar.png'
        }

        try{
            db.users.create(user)
                .then(user => {
                    console.log("done")
                    res.send(user)
                })
                .catch(err => {
                    res.status(500).send({
                        message:
                            "cannot be created"
                    });
                });
        }catch (err){
            res.status(400).send(err)
        }



})


module.exports = router;