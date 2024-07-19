const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: String,
    content: String,
    tags: [String],
    backgroundColor: String,
    isArchived: { type: Boolean, default: false },
    isTrashed: { type: Boolean, default: false },
    reminder: Date
}, { timestamps: true });

module.exports = mongoose.model('Note', NoteSchema);
