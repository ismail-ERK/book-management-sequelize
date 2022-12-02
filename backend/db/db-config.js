const dbConfig = require("../config/postgres-config");
require("dotenv").config();
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    port: process.env.DB_PORT,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
const livres = require("../models/Livres")(db.sequelize, db.Sequelize)
const genres = require("../models/Genre")(db.sequelize, db.Sequelize)
const editions = require("../models/Edition")(db.sequelize, db.Sequelize)
const users = require("../models/Users")(db.sequelize, db.Sequelize)
const commandes = require("../models/Commande")(db.sequelize, db.Sequelize)
const roles = require("../models/Roles")(db.sequelize, db.Sequelize)
db.livres = livres
db.genres = genres
db.editions = editions
db.users = users
db.commandes = commandes
db.roles = roles

db.genres.hasMany(db.livres, {as: "livres"})
db.livres.belongsTo(db.genres,{
    foreignKey: "genreId",
    as: "genre"
})

db.users.hasMany(db.commandes, {as: "commandes"})
db.commandes.belongsTo(db.users,{
    foreignKey: "userId",
    as: "user"
})

db.livres.hasMany(db.editions, {as: "editions"})
db.editions.belongsTo(db.livres,{
    foreignKey: "livreId",
    as: "livre"
})

db.livres.hasOne(db.commandes)
db.commandes.belongsTo(db.livres,{
    foreignKey: "livreId",
    as: "livre"
})






module.exports = db;

