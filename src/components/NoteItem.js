import React, { useContext } from "react";
import noteContext from "../context/notes/NoteContext";

// get a single note fromm Home
export const NoteItem = ({ note }) => {
  const { updateNote, deleteNote } = useContext(noteContext);

  const deleteNoteBtnClick = (id) => {
    deleteNote(id);
  };

  return (
    <>
      <div className="col-md-4 my-2">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title user-select-none">{note.title}</h5>
            <p className="card-text">{note.description}</p>
            {/* <a href="/" className="btn btn-primary"> */}
            <i
              className="btn btn-light fa-solid fa-trash"
              onClick={() => deleteNoteBtnClick(note._id)}
            />
            {/* </a> */}
            {/* <a href="/" className="btn btn-danger mx-2"> */}
            <i className="btn btn-light fa-solid fa-pen-to-square" />
            {/* </a> */}
          </div>
        </div>
      </div>
    </>
  );
};
