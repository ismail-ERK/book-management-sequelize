module.exports = (sequilize, Sequilize) => {
    return sequilize.define("users", {

        id: {
            type: Sequilize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequilize.STRING
        },
        email: {
            type: Sequilize.STRING
        },
        password: {
            type: Sequilize.STRING
        },
        role: {
            type: Sequilize.STRING
        },
        photo: {
            type: Sequilize.STRING
        },
    });
}

