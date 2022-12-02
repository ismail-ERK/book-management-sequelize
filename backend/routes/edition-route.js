const db = require("../db/db-config");
const router = require('express').Router();
const cors = require("cors")
const verify = require("../middleware/VerifyToken");
const verifyAuthorization = require("../middleware/VerifyAuthorization");

router.get('/',cors(), (req,res)=>{
    try {
        db.editions.findAll()
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

    db.editions.findAll({where: {id: req.params.id}})
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
router.get('/livre/:id',cors(), (req,res)=>{

    db.editions.findAll({where: {livreId: req.params.id}})
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
    const { maison_edition,id, date_edition } = req.body
    const edition = {
        maison_edition,
        date_edition,
        id,

    }
    db.editions.create(edition)
        .then(edition => {
            console.log("done")
            res.send(edition)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    "cannot be created"
            });
        });
})

router.put('/:id',cors(),verify,verifyAuthorization, (req,res)=>{
    const { maison_edition,id, date_edition } = req.body
    const edition = {
        maison_edition,
        date_edition,
        id,

    }
    db.editions.update(edition, {
        where: {id: req.params.id}
    })
        .then(edition => {
            console.log("done")
            res.send(edition)
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
        db.editions.destroy({
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