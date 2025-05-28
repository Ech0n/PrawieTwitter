const bcrypt = require('bcrypt');

const hash = async (password) => {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
};

const compare = async (plain, hashed) =>
    await bcrypt.compare(plain, hashed);

module.exports = {hash, compare};