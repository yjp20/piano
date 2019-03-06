const express = require('express');
const compression = require('compression')
const config = require('./config');

const app = express();

app.use(compression());
app.use(config.prefix, require('./router.js'));

app.listen(config.port, () => {
  console.log('app listening on port: ' + config.port + ' with prefix: ' + config.prefix);
});
