const path = require('path');
const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const rfs = require('rotating-file-stream');

const bodyParser = require('body-parser');

const pageRouter = require('./routes/page-router');
const userRouter = require('./routes/user-router');
const scoresRouter = require('./routes/scores-router');

const app = express();

// SOME USEFUL STUFF
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
});

// LOGGING
const accessLogStream = rfs.createStream('access.log', { 
    size: "10M",
    path: path.join(__dirname, 'log')
});

morgan.token('sessionId', (req) => {
    return req.session?.sessionId;
});

morgan.token('userId', (req) => {
    return req.session?.userId;
});

morgan.token('username', (req) => {
    return req.session?.username;
});

morgan.token('requestTime', (req) => {
    return req.requestTime;
});

app.use(morgan(':requestTime :remote-addr :username :userId :sessionId :method :url :response-time', { stream: accessLogStream }));


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
    req.session.username = 'adam';
    
    req.session.save((err) => {

        if (err) {
            console.error('Session save error:', err);
            return res.status(500).send('Failed to save session.');
        }

        res.redirect('/main');

    });

    // res.redirect('/login');
}

app.use('/', pageRouter);
app.use('/api/user', userRouter);
app.use('/api/pl', scoresRouter);

app.get('/dev', onStartUp);

module.exports = app;