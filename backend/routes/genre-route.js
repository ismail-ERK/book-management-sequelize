const db = require("../db/db-config");
const router = require('express').Router();
const cors = require("cors")
const verify = require("../middleware/VerifyToken");
const verifyAuthorization = require("../middleware/VerifyAuthorization");

router.get('/',cors(), (req,res)=>{
    try {
        db.genres.findAll()
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
router.get('/:id',cors(), (req,res)=>{

    db.genres.findAll({where: {id: req.params.id}})
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
router.post('/',cors(),verify,verifyAuthorization, (req,res)=>{
    console.log(req.body)
    const { name} = req.body
    const genre = {
        name,

    }
    db.genres.create(genre)
        .then(genre => {
            console.log("done")
            res.send(genre)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    "cannot be created"
            });
        });
})

router.put('/:id',cors(),verify,verifyAuthorization, (req,res)=>{
    const { name,id } = req.body
    const genre = {
        name,
        id,

    }
    db.genres.update(genre, {
        where: {id: req.params.id}
    })
        .then(genre => {
            console.log("done")
            res.send(genre)
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
        db.genres.destroy({
            where: { id: req.params.id }
        })
            .then(genre => {
                console.log("done")
                res.send("genre")
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