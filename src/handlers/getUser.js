const connectDatabase = require('../database/db');
const User = require('../models/user');

module.exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    try {
        connectDatabase();
        const {email} = event.pathParameters;
        userObj = await User.findOne({email});
        if(userObj) {
            return {
                statusCode: 200,
                body: JSON.stringify(userObj)
            }
        } else {
            return {
                statusCode: 404,
                body: JSON.stringify({msg: "User not found"})
            }
        }
        
    } catch (error) {
        console.error(error);
        return {
            statusCode: error.statusCode || 500,
            body: JSON.stringify({error: error.message})
        }
    }
}

