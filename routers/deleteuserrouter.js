const router = require('express').Router();
const deleteUserController = require('../controller/deleteusercontroller');

router.delete('/',deleteUserController.deleteUserController);

module.exports = router ;