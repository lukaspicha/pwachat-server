mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: ObjectId,
        ref: 'Avatar',
    },
    status: {
        type: String,
        required: true,
    }
});

const avatarSchema = new Schema({
    path: String,
    active: Boolean
});

const stateSchema = new Schema({
    code: String,
    text: String
});

const messageSchema = new Schema({
    sender: {
        type: ObjectId,
        ref: 'User'
    },
    receiver: {
        type: ObjectId,
        ref: 'User'
    },
    text: String,
    created: Date
});

const roomMessageSchema = new Schema({
    sender: {
        type: ObjectId,
        ref: 'User'
    },
    text: String,
    created: Date
});

const roomSchema = new Schema({
    users: [{
        type: ObjectId,
        ref: 'User'
    }],
    created: Date,
    messages: [{
        type: ObjectId,
        ref: 'RoomMessage'
    }]
});


module.exports.Avatar = mongoose.model('Avatar', avatarSchema);
module.exports.User = mongoose.model('User', userSchema);
module.exports.State = mongoose.model('State', stateSchema);
module.exports.Message = mongoose.model('Message', messageSchema);
module.exports.Room = mongoose.model('Room', roomSchema);
module.exports.RoomMessage = mongoose.model('RoomMessage', roomMessageSchema);

