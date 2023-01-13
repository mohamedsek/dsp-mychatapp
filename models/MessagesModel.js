const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    contenu: { type: String, required: true },
    timestamp: { type: Number },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;