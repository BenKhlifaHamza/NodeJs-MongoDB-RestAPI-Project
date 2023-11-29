const router = require('express').Router();
const testController = require('../controller/testconnection');

router.get('/',testController.testConnection);

module.exports = router ;