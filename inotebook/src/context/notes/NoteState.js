import { useState, useEffect, useCallback } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState(null);

 // Central error handler
  const handleError = (error, customMessage) => {
    console.error(error);
    setError(customMessage || error.message);
    setLoading(false);
    return null;
  };

  // Memoized logout function
  const logoutUser = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('id')
    setIsAuthenticated(false);
    setUser(null);
    setNotes([]);
    setError(null);
  }, []);

  // Note Operations
    const fetchNotes = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        logoutUser();
        throw new Error('Authentication required');
      }

      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        headers: { 'auth-token': token }
      });

      if (!response.ok) {
        if (response.status === 401) {
          logoutUser();
          throw new Error('Session expired. Please login again.');
        }
        throw new Error('Failed to fetch notes');
      }
      
      const notesData = await response.json();
      setNotes(Array.isArray(notesData) ? notesData : []);
      return notesData;
    } catch (error) {
      return handleError(error, 'Failed to load notes');
    } finally {
      setLoading(false);
    }
  }, [logoutUser, host]); 

  // Initialize authentication state on mount
useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const response = await fetch(`${host}/api/auth/getuser`, {
          headers: { 'auth-token': token }
        });
        
        if (!response.ok) {
          throw new Error('Session validation failed');
        }

        const userData = await response.json();
        setIsAuthenticated(true);
        setUser(userData);
        await fetchNotes();
      } catch (error) {
        handleError(error);
        logoutUser();
      }
    };
    
    verifyAuth();
  }, [fetchNotes, logoutUser, host]);


  const createNote = async (noteData) => {
  setLoading(true);
  setError(null);
  
  try {
    const token = localStorage.getItem('token');
    //  console.log(token)
    if (!token) {
      throw new Error('You must be logged in to create notes');
    }

    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'auth-token': token 
      },
      body: JSON.stringify(noteData)
    });
    console.log(!response.ok);
    if (!response.ok) throw new Error('Failed to create note');
  
    const newNote = await response.json();
    setNotes(prev => [...prev, newNote]);
    return newNote;
  } catch (error) {
    return handleError(error, 'Note creation failed');
  } finally {
    setLoading(false);
  }
};

  const deleteNote = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: 'DELETE',
        headers: { 'auth-token': token }
      });

      if (!response.ok) throw new Error('Failed to delete note');

      setNotes(prev => prev.filter(note => note._id !== id));
      return true;
    } catch (error) {
      return handleError(error, 'Note deletion failed');
    } finally {
      setLoading(false);
    }
  };

  const editNote = async (id, updatedData) => {
   
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token
        },
        body: JSON.stringify(updatedData)
      });

      if (!response.ok) throw new Error('Failed to update note');

      const updatedNote = await response.json();
      setNotes(prev => prev.map(note =>
        note._id === id ? { ...note, ...updatedNote } : note
      ));
      return updatedNote;
    } catch (error) {
      return handleError(error, 'Note update failed');
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async (credentials) => {
  setLoading(true);
  setError(null);

  try {
    const response = await fetch(`${host}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.error || 'Login failed');

    // Save token
    console.log(data ,"response")
    localStorage.setItem('token', data.authtoken);
     localStorage.setItem('id', data?.user?._id);
    setIsAuthenticated(true);

    // Now fetch user info
    const userResponse = await fetch(`${host}/api/auth/getuser`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': data.authtoken
      }
    });

    const userData = await userResponse.json();

    if (!userResponse.ok) throw new Error('Failed to fetch user');

    setUser(userData);

    // Fetch notes after successful login
    await fetchNotes();

    return { user: userData }; // THIS IS THE MAIN FIX for Login.jsx
  } catch (error) {
    return handleError(error);
  } finally {
    setLoading(false);
  }
};

  const registerUser = async (userData) => {
  setLoading(true);
  setError(null);
  
  try {
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: userData.name,
        email: userData.email,
        password: userData.password
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Registration failed');
    }

    // Store token and update state
    // localStorage.setItem('token', data.authtoken);
    //  localStorage.setItem('id',  data?.user?._id);
    // setIsAuthenticated(true);
    // setUser(data.user);
    
    // Automatically fetch empty notes list for new user
    await fetchNotes();
    
    return data;
  } catch (error) {
    return handleError(error);
  } finally {
    setLoading(false);
  }
};

  return (
    <NoteContext.Provider value={{
      notes,
      user,
      loading,
      error,
      isAuthenticated,
      getNotes: fetchNotes,
      addNote: createNote,
      deleteNote,
      editNote,
      loginUser,
      registerUser,
      logoutUser,
      alert,
      setAlert,
      clearError: () => setError(null) 
    }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;