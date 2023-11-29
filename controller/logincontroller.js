const myDetaBase = require('../database/connection');
const userModel = require('../models/usermodel').UserModel;
const bcrypt = require('bcrypt');
const tokenController = require('./tokencontroller');
const jwt = require('jsonwebtoken');

exports.loginController = async (req, res, next) => {
    const body = req.body;
    let message;
    let status;
    let data;
    let token;
    let tokenDecode;
    try {
        await myDetaBase.myConnection();
        const user = await userModel.findOne({ email: body.email });
        if (user) {
            const verifPassword = await bcrypt.compare(body.password, user.password);
            if (verifPassword) {
                token = tokenController.getTokenController(user._id, user.lastName);
                status = "success";
                message = "user verified";
                data = user;
                token  = token;
                tokenDecode = jwt.decode(token,{complete : true});
            } else {
                status = "failure";
                message = "invalid password";
                data = jwt.decode(token,{complete : true});
                token  = '';
                tokenDecode = '';
            }
        } else {
            status = "failure";
            message = "mail not found";
            data = {};
            token  = '';
            tokenDecode = '';
        }
    } catch (error) {
        status = "failure";
        message = "unknown error";
        data = {};
        token  = '';
        tokenDecode = '';
        console.error("Error on loginController : " + error.message);
    } finally {
        await myDetaBase.myDisconnect();
        res.json({
            "status" : status,
            "message" : message,
            "data" : data,
            "token" : token,
            "tokenDecode" : tokenDecode
        });
    }
}