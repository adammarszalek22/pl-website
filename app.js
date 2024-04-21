const express = require('express');
const session = require('express-session');
const morgan = require('morgan');

const bodyParser = require('body-parser');

const pageRouter = require('./routes/page-router');
const userRouter = require('./routes/user-router');
const scoresRouter = require('./routes/scores-router');

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

// For development (so i dont have to login every time)
const onStartUp = async (req, res) => {
    
    const { login } = require('./pl-server-api/user');
    const { v4: uuidv4 } = require('uuid');

    // Get response from pl server
    const response = await login({ username: 'adam', password: '1234' });

    req.session.sessionId = uuidv4();
    req.session.accessToken = response.access_token;
    req.session.refreshToken = response.refresh_token;
    req.session.userId = response.user_id;

    res.redirect('/main');

    // res.redirect('/login');
}

app.use('/', pageRouter);
app.use('/api/user', userRouter);
app.use('/api/pl', scoresRouter);

app.get('/', onStartUp);

module.exports = app;