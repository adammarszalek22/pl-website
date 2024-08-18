const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');

const port = process.env.PORT || 3000;
// 127.0.0.1:8000
app.listen(port, () => {
    console.log(`\x1b[34mApp running on at 127.0.0.1:${port}\x1b[0m`);
})
