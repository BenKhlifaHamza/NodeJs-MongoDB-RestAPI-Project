const myDetaBase = require('../database/connection');
const userModel = require('../models/usermodel').UserModel;

exports.deleteUserController =  async (req, res, next) => {
    userId = req.body._id;
    let  message ;
    let status ;
    let data ;
    try {
        await myDetaBase.myConnection();
        result = await userModel.deleteOne({_id:userId});
        if (result.deletedCount > 0) {
            status  = "success";
            message = "user deleted";
            data    = result ;
        } else {
            status  = "failure";
            message = "user not deleted";
            data    = result ;
        }
    }  catch (error) {
        status  = "failure";
        message = "unknown error" ;
        data    = {} ;
        console.error("Error on deleteUserController : " + error.message);
    }finally{
        myDetaBase.myDisconnect();
        res.json({
            "status"  : status,
            "message" : message,
            "data"    : data});
    } 
}