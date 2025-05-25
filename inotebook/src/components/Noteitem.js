import React, { useState } from "react";
import PropTypes from 'prop-types';
import Modal from "./Modal"
const NoteItem = ({ note, onDelete, updateNote }) => {
  console.log(note,"note")
  const[isOpenModal,setIsOpenModal] =useState(false)
  return (
    <div className='col-md-3 noteListParent'>
      <div className="card my-3">
       
        <div className="card-body notesItem">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{note.title}</h5>
            <i 
              className="fa-solid fa-trash mx-2" 
              onClick={() => onDelete(note._id)}
              aria-label="Delete note"
              role="button"
              tabIndex="0"
              onKeyDown={(e) => e.key === 'Enter' && onDelete(note._id)}
            ></i>
            <i 
              className="fa-solid fa-pen mx-2" 
              onClick={() => setIsOpenModal(true)}
              aria-label="Edit note"
              role="button"
              tabIndex="0"
              
            ></i>
          </div>
          <p className="card-text">{note.description}</p>
          {note.tag && (
            <span className="badge bg-secondary">{note.tag}</span>
          )}
        </div>
        {isOpenModal && <Modal note={note} setIsOpenModal={setIsOpenModal}/>}
       
      </div>
    </div>
  );
};

NoteItem.propTypes = {
  note: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    tag: PropTypes.string
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  updateNote: PropTypes.func.isRequired,
};

export default NoteItem;