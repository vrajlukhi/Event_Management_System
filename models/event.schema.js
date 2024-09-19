const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    maxAttendees: { type: Number, required: true },
    imageUrl: { type: String },
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
}, { timestamps: true });

const Event = mongoose.model('Event', eventSchema);
module.exports=Event
