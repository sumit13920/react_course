import { useState } from "react";
import NoteContext from "./noteContext";
// import { useState } from "react";

const NoteState = (props)=>{
    const notesInitial = [
  {
    "_id": "682b72a5edd21dfdbba6f4bb",
    "user": "682acea17d8088cfaea0cda9",
    "title": "My Title",
    "description": "Please wake up early",
    "tag": "personal",
    "date": "2025-05-19T18:04:21.023Z",
    "__v": 0
  },
  {
    "_id": "682b72a8edd21dfdbba6f4bd",
    "user": "682acea17d8088cfaea0cda9",
    "title": "My Title",
    "description": "Please wake up early",
    "tag": "personal",
    "date": "2025-05-19T18:04:24.721Z",
    "__v": 0
  },
  {
    "_id": "682b72a8edd21dfdbba6f4bd",
    "user": "682acea17d8088cfaea0cda9",
    "title": "My Title",
    "description": "Please wake up early",
    "tag": "personal",
    "date": "2025-05-19T18:04:24.721Z",
    "__v": 0
  },
  {
    "_id": "682b72a8edd21dfdbba6f4bd",
    "user": "682acea17d8088cfaea0cda9",
    "title": "My Title",
    "description": "Please wake up early",
    "tag": "personal",
    "date": "2025-05-19T18:04:24.721Z",
    "__v": 0
  },
   {
    "_id": "682b72a5edd21dfdbba6f4bb",
    "user": "682acea17d8088cfaea0cda9",
    "title": "My Title",
    "description": "Please wake up early",
    "tag": "personal",
    "date": "2025-05-19T18:04:21.023Z",
    "__v": 0
  },
  {
    "_id": "682b72a8edd21dfdbba6f4bd",
    "user": "682acea17d8088cfaea0cda9",
    "title": "My Title",
    "description": "Please wake up early",
    "tag": "personal",
    "date": "2025-05-19T18:04:24.721Z",
    "__v": 0
  },
  {
    "_id": "682b72a8edd21dfdbba6f4bd",
    "user": "682acea17d8088cfaea0cda9",
    "title": "My Title",
    "description": "Please wake up early",
    "tag": "personal",
    "date": "2025-05-19T18:04:24.721Z",
    "__v": 0
  },
  {
    "_id": "682b72a8edd21dfdbba6f4bd",
    "user": "682acea17d8088cfaea0cda9",
    "title": "My Title",
    "description": "Please wake up early",
    "tag": "personal",
    "date": "2025-05-19T18:04:24.721Z",
    "__v": 0
  }
]
const [notes, setNotes] = useState(notesInitial)
    return (
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;