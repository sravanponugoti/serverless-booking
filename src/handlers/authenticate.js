const bcrypt = require('bcryptjs');
const connectDatabase = require('../database/db');
const User = require('../models/user');
const generateToken = require('../utils/auth');
const buildResponse = require('../utils/util');

module.exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    try {
        await connectDatabase();
        const {email, password} = JSON.parse(event.body);
        let userObj = await User.findOne({email});
        if(!userObj) {
            return buildResponse(404, {msg: 'User not found'});
        }
        console.log(userObj);
        const isPwdCorrect = bcrypt.compareSync(password, userObj.password);
        if(isPwdCorrect) {
            const token = generateToken({email: userObj.email, name: userObj.name});
            // authenticated
            return buildResponse(200, {msg: 'Authenticated', token});
        } else {
            return buildResponse(401, {msg: 'Incorrect Password'});
        }
    } catch (error) {
        console.error(error);
        return buildResponse(error.statusCode || 500, {error: error.message});
    }
}

