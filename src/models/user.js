const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        trim: true,
        required: true,
        validate: [validator.isEmail, "Entered email is invalid"]
    },
    password: {
        type: String,
        required: [true, 'Please set a password'],
        minLength: 6
    }
});

UserSchema.pre('save', async function(next) {
    this.password = bcrypt.hashSync(this.password, 10);
    next();
})

module.exports = mongoose.model('User', UserSchema);
