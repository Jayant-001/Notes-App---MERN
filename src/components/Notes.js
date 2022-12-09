import React, { useContext, useEffect, useRef, useState } from "react";
import { NoteItem } from "./NoteItem";
import noteContext from "../context/notes/NoteContext";

export const Notes = () => {
  const { notes, fetchNotes, editNote } = useContext(noteContext);

  useEffect(() => {
    fetchNotes();
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null)

  const [note, setNote] = useState({
    _id: "",
    title: "",
    description: "",
    tag: "",
  });

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote(currentNote);
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    refClose.current.click()
    
    editNote(note._id, note.title, note.description, note.tag)

  };

  return (
    <div className="my-3">
      <h1>Your notes here</h1>

      {/* Button trigger modal */}
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      {/* Modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Update Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Note Title
                  </label>
                  <input
                    value={note.title}
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
                  value={note.description}
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
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Not now
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* traverse through Notes */}
      <div className="row">
        {notes.map((note) => {
          return (
            <NoteItem key={note._id} updateNote={updateNote} note={note} />
          );
        })}
      </div>
    </div>
  );
};
