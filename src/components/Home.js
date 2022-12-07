import React, { useContext } from "react";
import noteContext from "../context/notes/NoteContext";
import { AddNoteForm } from "./AddNoteForm";
import { NoteItem } from "./NoteItem";

export const Home = () => {
  const { notes, setNotes } = useContext(noteContext);

  console.log("notes ", notes);

  return (
    <>
      <div className="container my-3">
        <h1>Add Notes</h1>
        <AddNoteForm />
        <h1>Your notes here</h1>
        <div className="row">
          {notes.map((note) => {
            return <NoteItem key={note.date} note={note} />;
          })}
        </div>
      </div>
    </>
  );
};
