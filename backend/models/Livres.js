module.exports = (sequilize, Sequilize) => {
    const Livres = sequilize.define("livres", {

        id: {
            type: Sequilize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        title: {
            type: Sequilize.STRING
        },
        description: {
            type: Sequilize.STRING
        },
        prix: {
            type: Sequilize.INTEGER
        },
        couverture: {
            type: Sequilize.STRING
        },
        commander: {
            type: Sequilize.BOOLEAN,
            defaultValue: false,

        }
    })

    return Livres;
}

