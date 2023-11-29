const myDetaBase = require('../database/connection');
const userModel = require('../models/usermodel').UserModel;
const schemaValidation = require('../models/usermodel').schemaValidation;
const bcrypt = require('bcrypt');

exports.signUpController = async (req, res, next) => {
    const body = req.body;
    let message;
    let status;
    let data;
    let validation;
    try {
        validation =  schemaValidation.validate(
            {
                firstName: body.firstName,
                lastName: body.lastName,
                age: body.age,
                email: body.email,
                password: body.password,
                phone: body.phone
            });
        if (validation.error) {
            status = "failure";
            message = validation.error.details[0].message;
            data = {};
        } else {
            await myDetaBase.myConnection();
            const verifUser = await userModel.findOne({ email: body.email });
            if (verifUser) {
                status = "failure";
                message = "mail exists";
                data = {};
            } else {
                const passwordCrypte = await bcrypt.hash(body.password, 9);
                const newUser = new userModel({
                    firstName: body.firstName,
                    lastName: body.lastName,
                    age: body.age,
                    email: body.email,
                    password: passwordCrypte,
                    phone: body.phone,
                });
                const user = await newUser.save();
                status = "success";
                message = "user registered";
                data = user;
            }
        }
    } catch (error) {
        status = "failure";
        message = "unknown error";
        data = {};
        console.error("Error on signUpController : " + error.message);
    } finally {
        await myDetaBase.myDisconnect();
        res.json({
            "status": status,
            "message": message,
            "data": data
        });
    }
}