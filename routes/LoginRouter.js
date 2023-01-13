const LoginRouter = require('express').Router();
const LoginController = require('../controllers/LoginController')

LoginRouter.post('/',LoginController.login)
LoginRouter.get('/',LoginController.loginPage)


module.exports = LoginRouter