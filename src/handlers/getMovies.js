const connectDatabase = require('../database/db');
const Movie = require('../models/movie');

module.exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    try {
        connectDatabase();

        responseObj = await Movie.find();
        return {
            statusCode: 200,
            body: JSON.stringify(responseObj)
        }
    } catch (error) {
        console.error(error);
        return {
            statusCode: error.statusCode || 500,
            body: JSON.stringify({error: error.message})
        }
    }
}



