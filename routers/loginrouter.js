const router = require('express').Router();
const loginController = require('../controller/logincontroller');

router.post('/',loginController.loginController);

module.exports = router ;