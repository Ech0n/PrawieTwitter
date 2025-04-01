const LocalStrategy = require('passport-local').Strategy;
const db = require('../models');
const PasswordManager = require("./passwordManager");

const createStrategy = () => {
    return new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {
            try {
                const user = await db.User.findOne({
                    where: { email: email }
                });

                if (!user || !PasswordManager.compare(password, user.password))
                    return done(null, false, { message: 'Bad Credentials' });

                // If everything is good, return user
                return done(null, user);
            } catch (err) {
                return done(err, null);
            }
        }
    );
}

const serializeUser = () =>  {
    return ((user, done) => {
    done(null, user.id);
    })
};

const deserializeUser = () => {
    return (async (id, done) => {
        try {
            const user = await db.User.findByPk(id);
            if (!user) return done(null, false, { message: 'User does not exist' });
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    });
}

module.exports = {createStrategy, deserializeUser, serializeUser};
