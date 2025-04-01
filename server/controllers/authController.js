const passport = require("passport");

const login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err)
            return res.status(500).json({
                error: 'Internal server error'
            });

        if (!user)
            return res.status(400).json(info);

        req.logIn(user, (loginErr) => {
            if (loginErr)
                return res.status(500).json({
                    error: 'Failed to log in'
                });
            return res.status(200).json({ message: 'Authenticated successfully' });
        });
    })(req, res, next);
};

const logout = (req, res) => {
    if (!req.user) return res.sendStatus(401);

    req.logout((err) => {
        if (err) {
            return res.status(400).json({ message: 'Failed to log out' });
        }
        res.sendStatus(200);
    });
}

module.exports = {login, logout};