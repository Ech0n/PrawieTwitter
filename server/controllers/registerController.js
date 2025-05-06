const db = require('../models');
const PasswordManager = require("../auth/passwordManager");

const register = async (req, res) => {
    try {
        const { username, email, password, password2 } = req.body;

        let existingUser = await db.User.findOne({
            where: { email: email }
        });
        if (existingUser){
            return res.status(400).json({message: "Email already in use"});
        }
        existingUser = await db.User.findOne({
            where: {
                username: username
            }
        })
        if (existingUser){
            return res.status(400).json({message: "username already in use"});
        }
        // TODO: fields validation
        if (password !== password2)
            return res.status(400).json({message: "Passwords don't match"});

        const hashedPassword = PasswordManager.hash(password);

        const newUser = await db.User.create(
            {username, email, password_hash: hashedPassword });
        return res.status(201).json({ message: 'User created' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {register}