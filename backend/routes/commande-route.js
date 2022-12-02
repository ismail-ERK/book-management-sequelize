const db = require("../db/db-config");
const router = require('express').Router();
const cors = require("cors")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verify = require('../middleware/VerifyToken')
const verifyAuthorization = require('../middleware/VerifyAuthorization')




router.get('/',async (req,res)=> {

    await db.commandes.findAll()
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
router.get('/:id',async (req,res)=> {

    let commande = {}
    let myCommande = {}
    let livre = {}
    let user = {}

    await db.commandes.findAll({where: {id: req.params.id}})
        .then(res => {
            console.log("done")
            commande = {...res[0].dataValues}
            myCommande.id = res[0].dataValues.id
        })
        .catch(err => {
            res.status(500).send({
                message:
                    "cannot be getted"
            });
        });
    await db.livres.findAll({where: {id: commande.livreId}})
        .then(res => {
            console.log("done")
            livre = {...res[0].dataValues}
            myCommande.livre= {...livre}
        })
        .catch(err => {
            res.status(500).send({
                message:
                    "cannot be getted"
            });
        });
    await db.users.findAll({where: {id: commande.userId}})
        .then(result => {
            console.log("done")
            user = {...result[0].dataValues}
            myCommande.user= {...user}
            res.send(myCommande)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    "cannot be getted"
            });
        });
})



router.post('/add_commande',verify,async (req,res)=> {
    const {livreId}  = req.body;
    let user = {};
    let livre = {};
    let commande = {livreId};
    await db.users.findAll({where: {email: req.user.email}}).then((res => {
        user = {...res[0].dataValues};
        commande = {...commande, userId: user.id}

    }))
    await db.livres.findAll({where: {id: livreId}}).then((res => {
        livre = {...res[0].dataValues};

    }))
    await db.livres.update({...livre,commander:true}, {
        where: {id: livreId}
    })
        .then(book => {
            console.log("done")
        })
        .catch(err => {
            res.status(500).send({
                message:
                    "cannot be created"
            });
        });
    await db.commandes.create(commande)
        .then(command => {
            console.log("done")
            res.send(command);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    "cannot be created"
            });
        });

})

router.delete('/:id',verify, async (req,res)=>{

    let myCommande = {}
    let myBook = {}
    await db.commandes.findAll({where: {id: req.params.id}})
        .then(commande => {
            myCommande = {...commande[0].dataValues};
            console.log("done")
        })
        .catch(err => {
            res.status(500).send({
                message:
                    "cannot be getted"
            });
        });
    await db.livres.findAll({where: {id: myCommande.livreId}})
        .then(book => {
            myBook = {...book[0].dataValues};
            console.log("done")
        })
        .catch(err => {
            res.status(500).send({
                message:
                    "cannot be getted"
            });
        });
    await db.livres.update({...myBook,commander:false}, {
        where: {id: myCommande.livreId}
    })
        .then(book => {
            console.log("done")
        })
        .catch(err => {
            res.status(500).send({
                message:
                    "cannot be created"
            });
        });
    try {
        await db.commandes.destroy({
            where: { id: req.params.id }
        })
            .then(commande => {
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