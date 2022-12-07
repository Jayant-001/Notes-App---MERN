const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");

// ROUTE 1: fetch all notes - GET 'api/notes/fetchallnotes' - Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const note = await Note.find({ user: req.user.id });
    res.send(note);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error occurred");
  }
});

// ROUTE 2: add Note - GET 'api/notes/addnote' - Login required
router.post(
  "/addnote",
  fetchuser,
  // validate reqest's title and description
  [
    body("title", "Invalid title").isLength({ min: 3 }),
    body("description", "Invalid description").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      // if error: return Bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // get note data from request
      const { title, description, tag } = req.body;

      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savedNote = await note.save();

      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error occurred");
    }
  }
);

// ROUTE 3: update existing note - PUT 'api/notes/updateNote' - Login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;

    const newNote = {};

    if (title) newNote.title = title;
    if (description) newNote.description = description;
    if (tag) newNote.tag = tag;

    // find the note to be update and update
    let note = await Note.findById(req.params.id);
    if (!note) {
      res.status(404).send("Note not found");
    }

    if (note.user.toString() !== req.user.id) {
      res.status(401).send("Note belongs to another user");
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );

    res.status(200).send({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error occurred");
  }
});

//  ROUTE 4: delete existing note - DELETE 'api/notes/deletenote' - Login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    // Find note and delete
    let note = await Note.findById(req.params.id);

    // check note's existing
    if (!note) {
      return res.status(401).send("Note not found");
    }

    // check if user owns this note
    if (note.user.toString() !== req.user.id) {
      res.status(401).send("Note belongs to another user");
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.status(200).json({ Success: "Note has been deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error occurred");
  }
  
});

module.exports = router;
