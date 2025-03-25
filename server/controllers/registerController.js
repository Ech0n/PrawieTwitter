const db = require('../models');

const register = async (req, res) => {
    try {
        const { given_name, surname, email} = req.body;

        const existingUser = await db.User.findOne({
            where: { email }
        });

        if (existingUser){
            return res.status(400).json({message: "Email already in use"});
        }

        // Zależy jaki hasz dla hasła
        // const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await db.User.create({ given_name, surname, email});
        return res.status(201).json({ message: 'User created', newUser });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {register}