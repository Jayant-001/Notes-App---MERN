import React from "react";
import { AddNoteForm } from "./AddNoteForm";
import { Notes } from "./Notes";


export const Home = () => {

  return (
    <>
        <AddNoteForm />
        <hr />
        <Notes />
    </>
  );
};
