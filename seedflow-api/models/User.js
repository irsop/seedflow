const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    name: { type: String, required: false },
    login: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String, required: false, },
    phone: { type: String, required: false },
    role: { type: String },
});

module.exports = model('User', UserSchema);