module.exports = (sequilize, Sequilize) => {
    const Genres = sequilize.define("genres", {

        id: {
            type: Sequilize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        name: {
            type: Sequilize.STRING
        }
    })

    return Genres;
}

