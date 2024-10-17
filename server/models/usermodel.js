const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    submissions: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Submission' 
    }]  // Foreign key reference to Submissions
});

const User = mongoose.model('User', userSchema);
module.exports = User;
