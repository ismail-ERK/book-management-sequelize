const db = require("../db/db-config");
const router = require('express').Router();
const cors = require("cors")
const upload = require("../metier/UploadImage")
const verify = require('../middleware/VerifyToken')
const verifyAuthorization = require("../middleware/VerifyAuthorization");
router.get('/', async (req,res)=>{
try {
    let livres = await db.livres.findAll()
    res.send(livres)
}
catch (e){
    console.log(e)
}

})
router.get('/:id',cors(), (req,res)=>{

     db.livres.findAll({where: {id: req.params.id}})
        .then(livre => {
            console.log("done")
            res.send(livre)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    "cannot be getted"
            });
        });
})
//

router.post("/add_to_book/:id", async (req, res)=>{

    const {id} = req.params
    console.log("id : ",id)
    const { date_edition, maison_edition } = req.body
    let myLivre = {};
    await db.livres.findAll({where: {id: id}})
        .then(livre => {
            myLivre.id = livre[0].dataValues.id;
        })
        .catch(err => {
            res.status(500).send({
                message:
                    "cannot be getted"
            });
        });
    let edition = {
        maison_edition,
        date_edition
    }
    edition.livreId = myLivre.id;

    await db.editions.create(edition)
        .then(createdEdition => {
            console.log("edition done")
            res.send(createdEdition)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    "cannot be created"
            });
        });
})
router.post('/', upload.single('couverture'),async (req,res)=>{
    // res.writeHead(200,{
    //     'Access-Control-Allow-Origin' : '*',
    //     'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
    // })
    console.log(req.body)
        const { id,title, description, prix, date_edition, maison_edition, genreName } = req.body
    console.log(req.body)
    const couverturev = req.file.originalname;

    const livre = {
        id,title, description, couverture: couverturev, prix
    }
    const edition = {
        date_edition, maison_edition
    }
    const genre = {
        name: genreName
    }
    let myGenre = {};
    await db.genres.findAll({where: {name: genre.name}})
        .then(res => {
            myGenre.id = res[0].dataValues.id;
        })
        .catch(err => {
            res.status(500).send({
                message:
                    "cannot be getted"
            });
        });
    livre.genreId = myGenre.id;
    console.log("livre : ", livre)
    await db.livres.create(livre)
        .then(createdLivre => {
            console.log("done")
        })
        .catch(err => {
            res.status(500).send({
                message:
                    "cannot be created"
            });
        });
    let myLivre = {};
    await db.livres.findAll({where: {title: livre.title}})
        .then(res => {
            myLivre.id = res[0].dataValues.id;;
        })
        .catch(err => {
            res.status(500).send({
                message:
                    "cannot be getted"
            });
        });
    edition.livreId = myLivre.id;
    await db.editions.create(edition)
        .then(createdEdition => {
            console.log("edition done")
            res.send(createdEdition)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    "cannot be created"
            });
        });
})


// jai eu pas le tempts pour modifier l'image
router.put('/:id',verify,verifyAuthorization,(req,res)=>{
        const { id,title, description, couverture, prix } = req.body
    const livre = {
        id,title, description, couverture, prix
    }
     db.livres.update(livre, {
        where: {id: req.params.id}
    })
        .then(updatedLivre => {
            console.log("done")
            res.send(updatedLivre)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    "cannot be updated"
            });
        });
})

router.delete('/:id', verify,verifyAuthorization, (req,res)=>{

 try {
     db.livres.destroy({
         where: { id: req.params.id }
     })
    res.send('done')
 }
 catch (e){
     res.send(e)
 }
})

module.exports = router;