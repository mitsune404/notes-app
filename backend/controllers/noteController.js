const Note = require('../models/note');

exports.createNote = async (req, res) => {
    try {
        const note = new Note({ ...req.body, userId: req.user.id });
        await note.save();
        res.status(201).send(note);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

exports.getNotes = async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.user.id, isTrashed: false });
        res.send(notes);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

exports.updateNote = async (req, res) => {
    try {
        const note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send(note);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

exports.deleteNote = async (req, res) => {
    try {
        await Note.findByIdAndUpdate(req.params.id, { isTrashed: true });
        res.send({ message: 'Note trashed' });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

exports.getArchivedNotes = async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.user.id, isArchived: true });
        res.send(notes);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

exports.getTrashNotes = async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.user.id, isTrashed: true });
        res.send(notes);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

exports.getNotesByLabel = async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.user.id, tags: req.params.label });
        res.send(notes);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

exports.getNotesWithReminders = async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.user.id, reminder: { $exists: true, $gte: new Date() } });
        res.send(notes);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};
