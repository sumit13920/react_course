import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';
import LoadingSpinner from './LoadingSpinner';
import NoteItem from './NoteItem'; // Make sure to import NoteItem

const Notes = () => {
  const navigate = useNavigate();
  const context = useContext(noteContext);
  const { notes, getNotes,deleteNote,editNote, loading, error, isAuthenticated } = context;
  console.log(notes,"notes:::::")
  const id = localStorage.getItem("id");
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    const fetchNotes = async () => {
      await getNotes();
      
    };
    fetchNotes();
    console.log(notes)
  }, [isAuthenticated, getNotes, navigate,JSON.stringify(notes)]);

  // const ref = useRef(null)
  // const [note, setNote] = useState(id:'',)

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container my-4">
      <h2>Your Notes</h2>
      {notes.length === 0 ? (
        <div className="alert alert-info">No notes available. Add your first note!</div>
      ) : (
        <div className="notesList flex flex-col
        ">
          {Array.isArray(notes) && notes.map(note => (
            <div className="note" key={note._id}>
              <NoteItem note={note} onDelete={deleteNote} updateNote={editNote} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notes;