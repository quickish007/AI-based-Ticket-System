import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({

    title: String,
    description : String,
    status: {type: String, default: "TODO"},
    createdBy: {type: mongoose.SchemamTypes.ObjectId, ref: 'User'},
    assignedTo : {type: mongoose.SchemamTypes.ObjectId, ref: 'User', default: null},

    priority: String,
    deadline: Date,
    helpfulNotes: String,
    relatedSkills: [String],
    createdAt: {type: Date, default: Date.now}

})



export default mongoose.model('Ticket', ticketSchema)