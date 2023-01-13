const UserRouter = require('express').Router();
const UserController = require('../controllers/UserController')

// UserRouter.get('/:id',UserController.getUser)
UserRouter.post('/adduser',UserController.addUser)
// UserRouter.put('/:id',UserController.updateUser)
UserRouter.delete('/:id',UserController.deleteUser)

module.exports = UserRouter