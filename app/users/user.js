var mongoose = require('mongoose');

module.exports = mongoose.model('User', mongoose.Schema({
    email: String,
    password: String,
    name: String
}));

