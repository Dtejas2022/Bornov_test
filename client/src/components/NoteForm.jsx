import React, { useEffect, useState } from 'react';
import axios from 'axios';

function NoteForm() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [notes, setNotes] = useState([]);
    const [message, setMessage] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();

        //create new entry
        const newNote = { title, content };

        try {
            const res = await axios.post('http://localhost:3000/api/notes', newNote);
            setMessage("Note Created");
            setTitle('');
            setContent('');
            setNotes([res.data, ...notes]);
        } catch (err) {
            console.error(err.message);
        }
    };

    //show list 
    useEffect(() => {
        fetchNotes();
    },[]);

    const fetchNotes = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/notes');
            setNotes(res.data);
        } catch (err) {
            console.error('error fetching notes', err);
        }
    };

    return (
        <div className='container'>
            <h2>Create New Note</h2>

            {message && (
                <div className='alert alert-info'>{message}</div>
            )}

            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label className='form-label'>Title</label>
                    <input
                        type="text"
                        className='form-control'
                        value={title}
                        placeholder='Enter Note'
                        onChange={(e) => setTitle(e.target.value)}
                        required />
                </div>

                
                <div className='mb-3'>
                    <label className='form-label'>Content</label>
                    <textarea
                        className='form-control'
                        rows='5'
                        value={content}
                        placeholder='Enter Content'
                        onChange={(e) => setContent(e.target.value)}
                        required>

                    </textarea>
                </div>

                <button type='submit' className='btn btn-primary'>Save Note</button>
            </form>

            {/* note list */}
            <hr className="my-5" />
      <h3>Saved Notes</h3>
      {notes.length === 0 ? (
        <p>No notes found.</p>
      ) : (
            <div className='list-group'>
                {notes.map((note)=>(
                    <div key={note._id} className='list-group-item'>
                        <h5>{note.title}</h5>
                        <p>{note.content}</p>
                        <small className='text-muted'>Created At: {new Date(note.createdAt).toLocaleString()}</small>
                    </div>
                ))}
            </div>
      )}
        </div>
    );
};

export default NoteForm
