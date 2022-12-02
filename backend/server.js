require("dotenv").config();
const express = require('express');
const app = express();
const path = require('path');

const db = require("./db/db-config");
const bodyParser = require("body-parser")
var cors = require('cors')
console.log("db port : "+process.env.DB_PORT)
console.log("db username : "+process.env.DB_USER)
console.log("db password : "+process.env.DB_NAME)
console.log("db  : "+process.env.DB_PORT)
db.sequelize.sync()
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });
    // db.sequelize.sync({force: true}).then(()=>{
    //     console.log("drop")
    // })
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use('/public', express.static(path.join(__dirname, 'public')))
app.use(cors())
app.use(bodyParser.json())
app.listen(8012,()=>{
    console.log("Server lestenin port 8012");
})


const LivresRoutes=require('./routes/livres-route')
const GenresRoutes=require('./routes/genre-route')
const EditionRoutes=require('./routes/edition-route')
const CommandesRoutes=require('./routes/commande-route')
const AuthRoutes=require('./routes/auth-route')
const UsersRoutes=require('./routes/users-route')
const bcrypt = require("bcryptjs");
app.use('/livres',LivresRoutes)
app.use('/genres',GenresRoutes)
app.use('/editions',EditionRoutes)
app.use('/auth',AuthRoutes)
app.use('/commandes',CommandesRoutes)
app.use('/users',UsersRoutes)



db.users.findAll().then(async res => {

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('123456', salt);

    if (res.length === 0) {
        await db.users.create({
            name: 'ismail',
            email: 'ismail@gmail.com',
            password: hashedPassword,
            role: 'ADMIN',
            photo: 'avatar.png'
        })
    }



})

