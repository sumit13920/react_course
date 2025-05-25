// src/hooks/useNote.js
import { useContext } from 'react';
import NoteContext from '../context/notes/noteContext';

export const useNote = () => {
  return useContext(NoteContext);
};