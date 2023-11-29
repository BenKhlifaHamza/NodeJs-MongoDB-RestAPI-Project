const router = require('express').Router();
const signUpController = require('../controller/signupcontroller');

router.post('/',signUpController.signUpController);

module.exports = router ;