const db = require('../models');
const PasswordManager = require("../auth/passwordManager");

const register = async (req, res) => {
    try {
        const { given_name, surname, email, password, password2 } = req.body;

        const existingUser = await db.User.findOne({
            where: { email: email }
        });

        if (existingUser){
            return res.status(400).json({message: "Email already in use"});
        }
        // TODO: fields validation
        if (password !== password2)
            return res.status(400).json({message: "Passwords don't match"});

        const hashedPassword = PasswordManager.hash(password);

        const newUser = await db.User.create(
            { given_name, surname, email, password: hashedPassword });
        return res.status(201).json({ message: 'User created' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {register}