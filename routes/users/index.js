const express = require('express');
const router = express.Router();

const { getUsers, getUserById, createUser, updateUser, removeUser } = require('../../controllers/UsersControllers');

// Routes Users
router.get('/', getUsers);
router.get('/:userId', getUserById);
router.post('/', createUser);
router.put('/', updateUser);
router.delete('/:userId', removeUser);

module.exports = router;
