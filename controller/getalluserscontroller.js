const myDetaBase = require('../database/connection');
const userModel = require('../models/usermodel').UserModel;

exports.getAllUsersController = async (req, res, next) => {
    let  message ;
    let status ;
    let data ;
    try {
        await myDetaBase.myConnection();
        const allUsers = await userModel.find();
if (allUsers.length > 0) {
    status  = "success";
    message = "users returned";
    data    = allUsers ;
} else {
    status  = "failure";
    message = "no users";
    data    = [] ;
}
    } catch (error) {
        status  = "failure";
        message = "unknown error" ;
        data    = [] ;
        console.error("Error on getAllUsersController : " + error.message);
    }finally{
        myDetaBase.myDisconnect();
        res.json({
            "status"  : status,
            "message" : message,
            "data"    : data});
    }  
}