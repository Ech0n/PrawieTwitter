const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan'); // middleware do kolorowych logów
const cors = require('cors');
const session = require('express-session');
const passport = require('passport')

const usersRouter = require('./routes/users');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const postsRouter = require('./routes/posts');

const app = express();
const authLocalStrategy = require("./auth/authLocalStrategy");

app.use(cors({
    origin: process.env.REACT_ORIGIN || 'http://localhost:3001',
    credentials: true
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

passport.use(authLocalStrategy.createStrategy());
passport.serializeUser(authLocalStrategy.serializeUser());
passport.deserializeUser(authLocalStrategy.deserializeUser());

app.use(
    session({
        secret: process.env.SESSION_KEY || "SECRET_SESSION_KEY",
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 60000 * 60,
        }, // TODO: Add sqlite session store with connect-session-sequelize
    })
);

app.use(passport.initialize());
app.use(passport.session({}));


app.use('/users', usersRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/posts', postsRouter);

module.exports = app;
