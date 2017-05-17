var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    password: {type: String, required: true},
    time: {type: Date, required: true},
    email: {type: String, required: true, unique: true},
    sex: {type: Boolean},
    age: {type: Number},
    interests: [{type: String}],
    messages: [{type: Schema.Types.ObjectId, ref: 'Message'}],
    following: [{type: Schema.Types.ObjectId, ref: 'User'}],
    followed: [{type: Schema.Types.ObjectId, ref: 'User'}],
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', schema);