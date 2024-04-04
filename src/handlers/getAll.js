const connectDatabase = require('../database/db');
const User = require('../models/user');
const buildResponse = require('../utils/util');

module.exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    try {
        connectDatabase();

        userObj = await User.find();
        return buildResponse(200, userObj);
    } catch (error) {
        console.error(error);
        return buildResponse(error.statusCode || 500, {error: error.message});
    }
}