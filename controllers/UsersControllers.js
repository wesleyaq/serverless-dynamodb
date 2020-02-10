'use strict';

const { responseOk, responseError } = require('../Helpers');
const { getAll, getById, create, update, remove } = require('../Helpers/db');

const USERS_TABLE = process.env.USERS_TABLE;

const getUsers = (req, res) => {
  getAll(USERS_TABLE)
    .then(result => {
        res.json(responseOk(result.Items));
      },
      () => {
        res.status(400).json(responseError('No se ha podido acceder a los usuarios'));
      });
};

const getUserById = (req, res) => {
  const { userId } = req.params;

  getById({ userId }, USERS_TABLE)
    .then(result => {
        if (result.Item) {
          res.json(responseOk(result.Item));
        } else {
          res.status(404).json(responseError('Usuario no encontrado', {}));
        }
      },
      () => {
        res.status(400).json(responseError('No se ha podido acceder al usuario', {}));
      });
};

const createUser = (req, res) => {
  const { userId, name } = req.body;
  const data = {
    userId,
    name
  };

  create(data, USERS_TABLE)
    .then(() => {
      res.json(responseOk(data, 'Usuario creado'));
    },
    () => {
      res.status(400).json(responseError('No se ha podido crear el usuario'));
    });
};

const updateUser = (req, res) => {
  const { userId, name } = req.body;
  const data = {
    name
  };

  update(userId, data, USERS_TABLE)
    .then(() => {
      res.json(responseOk({userId, ...data}, 'Usuario actualizado'));
    },
    () => {
      res.status(400).json(responseError('No se ha podido actualizar el usuario'));
    });
};

const removeUser = (req, res) => {
  const { userId } = req.params;
  const data = {
    userId
  };

  remove(data, USERS_TABLE)
    .then(() => {
      res.json(responseOk(data, 'Usuario eliminado'));
    },
    () => {
      res.status(400).json(responseError('No se ha podido eliminar el usuario'));
    });
};

module.exports = { getUsers, getUserById, createUser, updateUser, removeUser };
