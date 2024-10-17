const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
    teamLead: {
        rollNo: { type: String, required: true },
        name: { type: String, required: true },
        mobile: { type: String, required: true },
    },
    student1: {
        rollNo: { type: String },
        name: { type: String },
    },
    teamName: { type: String, required: true },
    abstractProof: { type: String, required: true },  // Store the file path or URL
    problem: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Problem', 
        required: true 
    },  // Reference to the problem the team is registering for
    registeredAt: { type: Date, default: Date.now }
});
const Registration = mongoose.model('Registration', registrationSchema);
module.exports = Registration;
