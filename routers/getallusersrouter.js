const router = require('express').Router();
const getAllUsersController = require('../controller/getalluserscontroller');
const verifyTokenController = require('../controller/tokencontroller').verifyTokenController;

router.get('/',verifyTokenController,getAllUsersController.getAllUsersController);

module.exports = router ; 