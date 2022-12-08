import React, { useContext, useEffect } from "react";
import { NoteItem } from "./NoteItem";
import noteContext from "../context/notes/NoteContext";

export const Notes = () => {
  const { notes, fetchNotes } = useContext(noteContext);

  useEffect(() => {
    fetchNotes();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="my-3">
      <h1>Your notes here</h1>
      <div className="row">
        {notes.map((note) => {
          return <NoteItem key={note.date} note={note} />;
        })}
      </div>
    </div>
  );
};
