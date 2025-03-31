const bcrypt = require('bcrypt');

const hash = (password) => {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt);
};

const compare = (plain, hashed) =>
    bcrypt.compareSync(plain, hashed);

module.exports = {hash, compare};