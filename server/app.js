const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan'); // middleware do kolorowych logów
const cors = require('cors');
const session = require('express-session');
const passport = require('passport')
const path = require('path');

const usersRouter = require('./routes/users');
const registerRouter = require('./routes/register');
const authRouter = require('./routes/auth');
const postsRouter = require('./routes/posts');
const commentsRouter = require('./routes/comments');

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

// Route do statycznych plikow z folderu public
// W wersji produkcyjnej z buildowane pliki client trafiaja do folderu public
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/register', registerRouter);
app.use('/auth', authRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);

module.exports = app;
