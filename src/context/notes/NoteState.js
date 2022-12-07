import React, { useState } from 'react'
import NoteContext from './NoteContext'

const NoteState = (props) => {
    const inititalNotes = [
        {
          "_id": "63909a05e2d5ae2e57f61730",
          "user": "638f8966a9117cc190ac9c66",
          "title": "first Note",
          "description": "first note desciption",
          "tag": "priority 1",
          "date": "2022-12-07T13:49:57.051Z",
          "__v": 0
        },
        {
          "_id": "63909a109482f6db4794548c",
          "user": "638f8966a9117cc190ac9c66",
          "title": "first Note",
          "description": "first note desciption",
          "tag": "priority 1",
          "date": "2022-12-07T13:50:08.904Z",
          "__v": 0
        },
        {
          "_id": "63909eeb399e74574482a49e",
          "user": "638f8966a9117cc190ac9c66",
          "title": "another Note",
          "description": "another note desciption",
          "tag": "priority 2",
          "date": "2022-12-07T14:10:51.297Z",
          "__v": 0
        },
        {
            "_id": "63909a109482f6db4794548c",
            "user": "638f8966a9117cc190ac9c66",
            "title": "first Note",
            "description": "first note desciption",
            "tag": "priority 1",
            "date": "2022-12-07T13:50:08.904Z",
            "__v": 0
          },
          {
            "_id": "63909eeb399e74574482a49e",
            "user": "638f8966a9117cc190ac9c66",
            "title": "another Note",
            "description": "another note desciption",
            "tag": "priority 2",
            "date": "2022-12-07T14:10:51.297Z",
            "__v": 0
          },
          {
            "_id": "63909a109482f6db4794548c",
            "user": "638f8966a9117cc190ac9c66",
            "title": "first Note",
            "description": "first note desciption",
            "tag": "priority 1",
            "date": "2022-12-07T13:50:08.904Z",
            "__v": 0
          },
          {
            "_id": "63909eeb399e74574482a49e",
            "user": "638f8966a9117cc190ac9c66",
            "title": "another Note",
            "description": "another note desciption",
            "tag": "priority 2",
            "date": "2022-12-07T14:10:51.297Z",
            "__v": 0
          }
      ]

      const [notes, setNotes] = useState(inititalNotes)

    return ( 
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState