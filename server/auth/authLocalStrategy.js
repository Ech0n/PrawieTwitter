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

                if (!user || !await PasswordManager.compare(password, user.password_hash))
                    return done(null, false, { error: 'Bad Credentials' });

                // If everything is good, return user
                const { password_hash, ...safeUser } = user.get({ plain: true });
                return done(null, safeUser);
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
            const user = await db.User.findByPk(id, {
                attributes: { exclude: ['password_hash'] }
            });
            if (!user) return done(null, false, { message: 'User does not exist' });

            const safeUser = user.get({ plain: true });
            done(null, safeUser);
        } catch (err) {
            done(err, null);
        }
    });
}

module.exports = {createStrategy, deserializeUser, serializeUser};
