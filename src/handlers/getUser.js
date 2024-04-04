const connectDatabase = require('../database/db');
const User = require('../models/user');
const buildResponse = require('../utils/util');

module.exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    try {
        connectDatabase();
        const {email} = event.pathParameters;
        userObj = await User.findOne({email});
        if(userObj) {
            return buildResponse(200, userObj);
        } else {
            return buildResponse(404, {msg: "User not found"});
        }
        
    } catch (error) {
        console.error(error);
        return buildResponse(error.statusCode || 500, {error: error.message});
    }
}

