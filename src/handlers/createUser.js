const connectDatabase = require('../database/db');
const User = require('../models/user');
const buildResponse = require('../utils/util');

module.exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    try {
        connectDatabase();
        const {name, email, password} = JSON.parse(event.body);
        let userObj = {name, email, password};
        userObj = await User.create(userObj);
        return buildResponse(201, userObj);
    } catch (error) {
        console.error(error);
        return buildResponse(error.statusCode || 500, {error: error.message});
    }
}

