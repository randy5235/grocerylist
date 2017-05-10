const bodyParser = require('body-parser');
const express = require('express');
const router = require('./routes');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api', router);
app.listen(port);
