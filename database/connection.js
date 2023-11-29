const mongoose = require('mongoose');

// URL to establish a database connection
const myUrl = "mongodb://127.0.0.1:27017/projetApi";

// Function to establish a database connection
exports.myConnection = async () => {
    try {
        await mongoose.connect(myUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connection to the database successful!");
    } catch (error) {
        console.error("Error connecting to the database:", error.message);
        // You might want to throw the error here so that the caller can handle it if needed.
        throw error;
    }
};

// Function to disconnect a database 
exports.myDisconnect = async () => {
    try {
        await mongoose.disconnect();
        console.log("Disconnected successful!");
    } catch (error) {
        console.error("Error disconnecting from the database:", error.message);
        // You might want to throw the error here as well, if the disconnection is critical.
        throw error;
    }
};
