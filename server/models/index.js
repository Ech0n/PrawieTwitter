const sequelize = require('../database/config');

const User = require('./user');

const db = {
    sequelize,
    User
}

// Jakieś domyślne wartości w bazie danych
async function initializeDefaults() {

}


// Synchronization
sequelize.sync({ alter: false }).then(async () => {
    console.log('Database & tables created!');
    await initializeDefaults();
});

module.exports = db;