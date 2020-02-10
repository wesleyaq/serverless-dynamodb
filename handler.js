"use strict";

const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const cors = require('cors');

const routesApiV1 = require('./routes/api.v1');

const app = express();

app.use(cors());
//app.use(bodyParser.json({ string: false }));
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api', routesApiV1);

// Route not found (404)
app.use(function(req, res) {
  return res.status(404).send({ message: `Ruta ${req.url} no encontrada.` });
});

module.exports.generic = serverless(app);
