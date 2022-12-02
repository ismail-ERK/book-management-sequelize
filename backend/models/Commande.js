module.exports = (sequilize, Sequilize) => {
    const Commande = sequilize.define("commandes", {

        id: {
            type: Sequilize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

    })

    return Commande;
}

