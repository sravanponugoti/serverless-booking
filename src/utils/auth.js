const jwt = require('jsonwebtoken');

module.exports = function generateToken(user) {
    if (!user) {
        return;
    }

    const userInfo = {
        email: user.email,
        name: user.name
    }

    return jwt.sign(userInfo, process.env.JWT_SECRET, {
        expiresIn: '1h'
    })
}

