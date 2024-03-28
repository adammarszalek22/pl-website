const express = require('express');
const session = require('express-session');
const morgan = require('morgan');

const bodyParser = require('body-parser');

const pageRouter = require('./routes/page-router');
const userRouter = require('./routes/user-router');

const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
app.use(session({
    secret: "guihstirv87ntmwert7wmve09tyq9w8ytweoytw09erce9srthgsoe",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }

}))

app.use((req, _, next) => {
    req.requestTime = new Date().toISOString();
    next()
})

const onStartUp = (req, res) => {
    res.redirect('/registration');
}

app.use('/', pageRouter);
app.use('/api/user', userRouter);

app.get('/', onStartUp);

module.exports = app;