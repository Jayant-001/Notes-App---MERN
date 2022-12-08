import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";

  const inititalNotes = [];

  const [notes, setNotes] = useState(inititalNotes);

  // fetch All notes note
  const fetchNotes = async () => {
    // API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM4Zjg5NjZhOTExN2NjMTkwYWM5YzY2In0sImlhdCI6MTY3MDM1MjIxNX0.T8gx-YHpGUGWE15XDUpDj7KaBStncEHJ_i7x3Tfj53Y",
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  };

  // Add note
  const addNote = async (title, description, tag) => {
    // API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM4Zjg5NjZhOTExN2NjMTkwYWM5YzY2In0sImlhdCI6MTY3MDM1MjIxNX0.T8gx-YHpGUGWE15XDUpDj7KaBStncEHJ_i7x3Tfj53Y",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    // console.log(json)
    setNotes(notes.concat(json));
  };

  // delete note
  const deleteNote = async (id) => {
    // API call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM4Zjg5NjZhOTExN2NjMTkwYWM5YzY2In0sImlhdCI6MTY3MDM1MjIxNX0.T8gx-YHpGUGWE15XDUpDj7KaBStncEHJ_i7x3Tfj53Y",
      },
    });
    const json = response.json();
    console.log(json);

    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // update note
  const updateNote = async (id, title, description, tag) => {
    // API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM4Zjg5NjZhOTExN2NjMTkwYWM5YzY2In0sImlhdCI6MTY3MDM1MjIxNX0.T8gx-YHpGUGWE15XDUpDj7KaBStncEHJ_i7x3Tfj53Y",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();
    console.log(json);

    // Find Note and edit it
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];

      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, updateNote, fetchNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
