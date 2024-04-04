const connectDatabase = require('../database/db');
const Movie = require('../models/movie');
const buildResponse = require('../utils/util');

module.exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    try {
        connectDatabase();
        const {name, rating} = JSON.parse(event.body);
        let payloadObj = {name, rating};
        payloadObj = await Movie.create(payloadObj);
        return buildResponse(201, payloadObj);
    } catch (error) {
        console.error(error);
        return buildResponse(error.statusCode || 500, {error: error.message});
    }
}

