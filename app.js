const express = require('express');

const config = require('./config');

const app = express();

app.use(require('./router.js'));

app.listen(config.port);
