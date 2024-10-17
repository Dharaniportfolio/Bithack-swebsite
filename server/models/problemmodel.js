const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
    category: { type: String, required: true },
    domain: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    problemCode: { type: String, unique: true, required: true },
    maxParticipants: { type: Number, required: true },
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Staff', 
        //required: true 
    },  // Foreign key reference to the Staff member who created it
    participants: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }],  // Foreign key reference to Users participating in the problem
    registeredCount: {type: Number,default:0}
});

const Problem = mongoose.model('Problem', problemSchema);
module.exports = Problem;
