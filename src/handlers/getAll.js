const connectDatabase = require('../database/db');
const User = require('../models/user');

module.exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    try {
        connectDatabase();

        userObj = await User.find();
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
            },
            body: JSON.stringify(userObj)
        }
    } catch (error) {
        console.error(error);
        return {
            statusCode: error.statusCode || 500,
            body: JSON.stringify({error: error.message})
        }
    }
}