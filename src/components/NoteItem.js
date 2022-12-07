import React from "react";

export const NoteItem = ({note}) => {

    console.log(note.title)

  return (
    <>
    <div className="col-md-4 my-2">

      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">
            {note.description}
          </p>
          <a href="#" className="btn btn-primary">
            Button
          </a>
        </div>
      </div>
    </div>
    </>
  );
};
