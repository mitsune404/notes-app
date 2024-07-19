document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('token');

    if (!token) {
        window.location.href = 'login.html';
    }

    document.getElementById('logout').addEventListener('click', function() {
        localStorage.removeItem('token');
        window.location.href = 'login.html';
    });

    document.getElementById('create-note').addEventListener('click', createNote);

    function createNote() {
        const title = document.getElementById('note-title').value;
        const content = document.getElementById('note-content').value;
        const tags = document.getElementById('note-tags').value.split(',').map(tag => tag.trim());
        const backgroundColor = document.getElementById('note-color').value;

        fetch('https://notes-backend-7rvv.onrender.com/api/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ title, content, tags, backgroundColor })
        })
        .then(response => response.json())
        .then(note => {
            addNoteToUI(note);
        })
        .catch(error => console.error('Error:', error));
    }

    function addNoteToUI(note) {
        const notesList = document.getElementById('notes-list');
        const noteElement = document.createElement('div');
        noteElement.className = 'note';
        noteElement.style.backgroundColor = note.backgroundColor;

        noteElement.innerHTML = `
            <div class="note-header">
                <h3>${note.title}</h3>
                <div class="note-actions">
                    <button onclick="archiveNote('${note._id}')">Archive</button>
                    <button onclick="deleteNote('${note._id}')">Delete</button>
                </div>
            </div>
            <p>${note.content}</p>
            <div class="note-tags">${note.tags.join(', ')}</div>
        `;

        notesList.appendChild(noteElement);
    }

    function archiveNote(noteId) {
        fetch(`https://notes-backend-7rvv.onrender.com/api/notes/${noteId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ isArchived: true })
        })
        .then(response => response.json())
        .then(() => {
            loadNotes();
        })
        .catch(error => console.error('Error:', error));
    }

    function deleteNote(noteId) {
        fetch(`https://notes-backend-7rvv.onrender.com/api/notes/${noteId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(() => {
            loadNotes();
        })
        .catch(error => console.error('Error:', error));
    }

    function loadNotes() {
        fetch('https://notes-backend-7rvv.onrender.com/api/notes', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(notes => {
            const notesList = document.getElementById('notes-list');
            notesList.innerHTML = '';
            notes.forEach(note => addNoteToUI(note));
        })
        .catch(error => console.error('Error:', error));
    }

    loadNotes();
});
