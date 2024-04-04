const mongoose = require('mongoose');

let conn = null;

module.exports = connectDatabase = async() => {
    if(conn === null) {
        console.log('creating connection', process.env.DB);
        conn = await mongoose.connect(process.env.DB, {
            serverSelectionTimeoutMS: 5000
        })
        return conn;
    }
    console.log('connection already there');
}