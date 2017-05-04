const bodyParser = require('body-parser');
const express = require('express');
const pg = require('pg');
const router = require('./routes/index.js');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api', router);
app.listen(port);
