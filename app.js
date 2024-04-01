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

// For development only
app.use((req, res, next) => {
    req.session.accessToken = req.session.accessToken || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6dHJ1ZSwiaWF0IjoxNzExOTc4MDAzLCJqdGkiOiJjZjE1Y2UyNy1kMjhiLTQ5MjMtODcxOC1mMDQ3OTQ2OTI0NzEiLCJ0eXBlIjoiYWNjZXNzIiwic3ViIjoxLCJuYmYiOjE3MTE5NzgwMDMsImNzcmYiOiJlNWZlMDFkMS03ZGY2LTQyYjktOWEyZS03NWU0OWVjYjJlOGEiLCJleHAiOjE3MTE5ODE2MDMsImlzX2FkbWluIjpmYWxzZX0.HoMclE5u-TgNQcTtivvxhC-U2C4uNaqO4dJjPIbGwuM';
    next();
})

const onStartUp = (req, res) => {
    res.redirect('/login');
}

app.use('/', pageRouter);
app.use('/api/user', userRouter);

app.get('/', onStartUp);

module.exports = app;