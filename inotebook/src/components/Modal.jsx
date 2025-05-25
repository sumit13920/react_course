import { useState, useEffect ,useContext} from "react";
import noteContext from '../context/notes/noteContext'

export default function Modal({note,setIsOpenModal}) {
    const context = useContext(noteContext)
    const [render,setRender] =useState(false)
    const { editNote, getNotes, loading, error } = context;
    console.log(note,"note")
    // console.log(editNote,"updateNOTE")
    const id =localStorage.getItem("id")
    //  console.log(id,"id")
  const [notes, setNotes] = useState({ title: note?.title, description:note?.description , tag: note?.tag });
//   CONSOLE.LOG(note.,"_ID")


  const onChange = (e) => {
    setNotes({ ...notes, [e.target.name]: e.target.value });
  };

  function handleClick(e) {
    // e.preventDefault(); 
    // console.log("Edited Note:", notes);
    editNote(note._id,notes)
    setIsOpenModal(false) 
    setRender(true)
  }
//    useEffect(() => { 
    
//       const fetchNotes = async () => {
//         await getNotes();
//         setRender(false)
        
//       };
//       fetchNotes();
//       console.log(notes,"NOTES ON DASHBOARD")
//     }, [render]);

  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Note</h5>
            <button type="button" className="btn-close" onClick={()=>setIsOpenModal(false)}></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={notes?.title}
                  onChange={onChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  name="description"
                  value={notes?.description}
                  onChange={onChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="tag" className="form-label">Tag</label>
                <input
                  type="text"
                  className="form-control"
                  id="tag"
                  name="tag"
                  value={notes?.tag}
                  onChange={onChange}
                />
              </div>
              <button type="submit" className="btn btn-primary" onClick={handleClick}>
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
