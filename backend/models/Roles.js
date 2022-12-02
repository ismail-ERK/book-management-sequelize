module.exports = (sequilize, Sequilize) => {
    return sequilize.define("roles", {

        id: {
            type: Sequilize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequilize.STRING
        },

    });
}

