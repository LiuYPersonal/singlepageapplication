var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Message = require('./message');

var schema = new Schema({
    content: {type: String, required: true},
    message: {type: Schema.Types.ObjectId, ref: 'Message'},
    username: {type: String},
    time: {type: Date}
});

schema.post('remove', function (comment) {
    Message.findById(comment.message, function (err, message) {
        message.pull(comment);
        message.save();
    });
});

module.exports = mongoose.model('Comment', schema);