const db = require("../db/db-config");
const router = require('express').Router();
const cors = require("cors")
const verify = require("../middleware/VerifyToken");
const verifyAuthorization = require("../middleware/VerifyAuthorization");
const upload = require("../metier/UploadImageProfile");

router.get('/',cors(),verify,verifyAuthorization, (req,res)=>{
    try {
        db.users.findAll()
            .then(genres => {
                console.log("done")
                res.send(genres)
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        "cannot be getted"
                });
            });
    }
    catch (e){
        console.log(e)
    }

})
router.get('/:id',cors(),verify, (req,res)=>{

    db.users.findAll({where: {id: req.params.id}})
        .then(genre => {
            console.log("done")
            res.send(genre)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    "cannot be getted"
            });
        });
})
router.get('/:id/commandes',cors(),verify,verifyAuthorization, (req,res)=>{

    db.commandes.findAll({where: {userId: req.params.id}})
        .then(commandes => {
            console.log("done")
            res.send(commandes)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    "cannot be getted"
            });
        });
})
router.put('/:id/photo',upload.single('photo'),cors(),verify,async (req,res)=>{
    let myUser = {}
    console.log('file',req.file)
    const couverturev = req.file.originalname;

    await db.users.findAll({where: {id: req.params.id}})
        .then(user => {
            console.log("done")
            myUser = {...user[0].dataValues, photo: couverturev}
        })
        .catch(err => {
            res.status(500).send({
                message:
                    "cannot be getted"
            });
        });
    console.log("myUser",myUser)
    await  db.users.update(myUser, {
        where: {id: req.params.id}
    })
        .then(updatedUser => {
            console.log("done update")
            res.send(updatedUser)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    "cannot be updated"
            });
        });

})
router.get('/livre/:id',cors(),verify,verifyAuthorization, (req,res)=>{

    db.users.findAll({where: {livreId: req.params.id}})
        .then(genre => {
            console.log("done")
            res.send(genre)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    "cannot be getted"
            });
        });
})
//


router.put('/:id',cors(),verify,verifyAuthorization, (req,res)=>{
    const { name,email,id } = req.body
    const user = {
        name,
        email,
        id,

    }
    db.users.update(user, {
        where: {id: req.params.id}
    })
        .then(user => {
            console.log("done")
            res.send(user)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    "cannot be updated"
            });
        });
})

router.delete('/:id',cors(),verify,verifyAuthorization, (req,res)=>{

    try {
        db.users.destroy({
            where: { id: req.params.id }
        })
            .then(edition => {
                console.log("done")
                res.send("done")
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        "cannot be getted"
                });
            });
    }
    catch (e){
        console.log(e)
    }
})

module.exports = router;