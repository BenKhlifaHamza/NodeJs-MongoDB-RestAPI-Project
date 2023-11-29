const mongoose = require("mongoose");
const Joi = require('joi');

// Define the user schema validation
const schemaValidation = Joi.object({
    firstName: Joi.string().alphanum().min(3).max(30).required(),

    lastName: Joi.string().alphanum().min(3).max(30),    

    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    age: Joi.number().integer().min(18).max(75),

    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

    phone: Joi.number().required(),    
    });

// Define the user schema
const userSchema = mongoose.Schema({
    firstName : String,
    lastName  : String,
    age       : Number,
    email     : String,
    password  : String,
    phone     : String,
});

// Create the user model
const UserModel = mongoose.model("user", userSchema);

// Export the user model
exports.UserModel = UserModel;

// Export the schema validation
exports.schemaValidation = schemaValidation;

