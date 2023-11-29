const router = require('express').Router();
const updateUserController = require('../controller/updateusercontroller');

router.patch('/',updateUserController.updateUserController);

module.exports = router ;