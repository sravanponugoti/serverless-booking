const connectDatabase = require('../database/db');
const Movie = require('../models/movie');
const buildResponse = require('../utils/util');

module.exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    try {
        connectDatabase();

        responseObj = await Movie.find();
        return buildResponse(200, responseObj);
    } catch (error) {
        console.error(error);
        return buildResponse(error.statusCode || 500, {error: error.message});
    }
}



