const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    supabase_id: { type: String, required: true, unique: true },
    sessions: [{ loginTime: Date, ipAddress: String }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
