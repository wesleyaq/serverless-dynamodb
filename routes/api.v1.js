const express = require('express');
const apiRoutes = express.Router();

const usersRoutes = require('./users');

// Users
apiRoutes.use('/users', usersRoutes);

module.exports = apiRoutes;
