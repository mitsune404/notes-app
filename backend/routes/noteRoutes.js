const express = require('express');
const { createNote, getNotes, updateNote, deleteNote, getArchivedNotes, getTrashNotes, getNotesByLabel, getNotesWithReminders } = require('../controllers/noteController');
const { authenticate } = require('../middlewares/authenticate');

const router = express.Router();

router.use(authenticate);

router.post('/', createNote);
router.get('/', getNotes);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);
router.get('/archived', getArchivedNotes);
router.get('/trash', getTrashNotes);
router.get('/labels/:label', getNotesByLabel);
router.get('/reminders', getNotesWithReminders);

module.exports = router;
