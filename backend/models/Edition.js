module.exports = (sequilize, Sequilize) => {
    const Edition = sequilize.define("editions", {

        id: {
            type: Sequilize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        date_edition: {
            type: Sequilize.STRING
        },
        maison_edition: {
            type: Sequilize.STRING
        }
    })

    return Edition;
}

