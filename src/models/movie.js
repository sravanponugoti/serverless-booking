const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Please add movie name']
    },
    rating: {
        type: String,
        trim: true,
    },
});

module.exports = mongoose.model('Movie', MovieSchema);
