const connectDatabase = require('../database/db');
const Movie = require('../models/movie');

module.exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    try {
        connectDatabase();
        const {name, rating} = JSON.parse(event.body);
        let payloadObj = {name, rating};
        payloadObj = await Movie.create(payloadObj);
        return {
            statusCode: 201,
            body: JSON.stringify(payloadObj)
        }
    } catch (error) {
        console.error(error);
        return {
            statusCode: error.statusCode || 500,
            body: JSON.stringify({error: error.message})
        }
    }
}

