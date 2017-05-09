var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require('./user');
var Comment = require('./comment');

var schema = new Schema({
    content: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    likes: {type: Number},
    time: {type: Date},
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
    
});

schema.post('remove', function (message) {
    User.findById(message.user, function (err, user) {
        user.messages.pull(message);
        user.save();
    });
});

module.exports = mongoose.model('Message', schema);