const myDetaBase = require("../database/connection")

exports.testConnection = async (req,res,next)=>{
    await  myDetaBase.myConnection();
    res.send("Welcome to project rest api with node.js ... ");
    await  myDetaBase.myDisconnect();
}