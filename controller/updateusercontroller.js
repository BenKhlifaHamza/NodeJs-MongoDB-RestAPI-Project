const myDetaBase = require('../database/connection');
const userModel = require('../models/usermodel').UserModel;

exports.updateUserController = async (req, res, next) => {
    const body = req.body;
    let message;
    let status;
    let data;
    try {
        await myDetaBase.myConnection();
        const user = await userModel.updateOne({ _id: body._id } , {
            firstName : body.firstName,
            lastName  : body.lastName,
            age       : body.age,
            email     : body.email,
            phone     : body.phone,
        });
        if (user.modifiedCount > 0) {
            status = "success";
            message = "user updated";
            data = user;
        } else {
            status = "failure";
            message = "user not updated";
            data = user;
        }
    } catch (error) {
        status = "failure";
        message = "unknown error";
        data = {};
        console.error("Error on updateUserController : ", error.message);
    } finally {
        await myDetaBase.myDisconnect();
        res.json({
            "status": status,
            "message": message,
            "data": data
        });
    }
};