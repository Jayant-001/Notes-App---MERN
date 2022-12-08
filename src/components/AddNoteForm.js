import React, { useContext, useState } from "react";
import noteContext from "../context/notes/NoteContext";

export const AddNoteForm = () => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "default",
  });

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const addNoteBtnClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
  };

  return (
    <>
      <div className="container my-3">
        <h1>Add Note</h1>
        <div className="form-text">
          We'll never share your note with anyone else.
        </div>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Note Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Note Desctiption
            </label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              rows="3"
              onChange={onChange}
            ></textarea>
          </div>
          <div className="mb-3">
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="tag"
                onChange={onChange}
                id="general"
                value="general"
              />
              <label className="form-check-label" htmlFor="general">
                General
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="tag"
                onChange={onChange}
                id="important"
                value="important"
              />
              <label className="form-check-label" htmlFor="important">
                Important
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="tag"
                onChange={onChange}
                id="todo"
                value="todo"
              />
              <label className="form-check-label" htmlFor="todo">
                ToDo
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="tag"
                onChange={onChange}
                id="other"
                value="other"
              />
              <label className="form-check-label" htmlFor="other">
                Other
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={addNoteBtnClick}
          >
            Add Note
          </button>
        </form>
      </div>
    </>
  );
};
