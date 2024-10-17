const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdProblems: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Problem' 
    }]  // Foreign key reference to Problems created by the staff
});

const Staff = mongoose.model('Staff', staffSchema);
module.exports = Staff;
