const express = require('express');
const morgan = require('morgan');

const pageRouter = require('./routes/page-router');
const userRouter = require('./routes/user-router');

const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, _, next) => {
    req.requestTime = new Date().toISOString();
    next()
})

const onStartUp = (req, res) => {
    res.redirect('/login');
}

app.use('/', pageRouter);
app.use('/api/user', userRouter);

app.get('/', onStartUp);

module.exports = app;