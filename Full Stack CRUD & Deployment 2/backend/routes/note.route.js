const express = require("express");
const { NoteModel } = require("../model/note.model");
const { auth } = require("../middlewares/auth.middleware");

const noteRouter = express.Router();

noteRouter.post("/", auth, async (req, res) => {
  // const {title,body,userID,username} = req.body;
  try {
    const note = new NoteModel(req.body);
    await note.save();
    res.json({ msg: "A new note has een added" });
  } catch (err) {
    res.json({ msg: err });
  }
});

noteRouter.get("/", auth, async (req, res) => {
  try {
    const note = await NoteModel.find({ userID: req.body.userID });
    res.json({ note });
  } catch (err) {
    res.json({ msg: err });
  }
});

noteRouter.patch("/:noteID", auth, async (req, res) => {
  const payload = req.body;
  const { noteID } = req.params;
  try {
    const note = await NoteModel.findOne({ _id: noteID });
    if (req.body.userID === note.userID) {
      await NoteModel.findByIdAndUpdate({ _id: noteID }, payload);
      res.json({ msg: `The note with ID:${noteID} has been updated` });
    }else{
        res.json({ msg: "you don't hae access" });
    }
  } catch (err) {
    res.json({ msg: err });
  }
});


noteRouter.delete("/:noteID", auth, async (req, res) => {
    const { noteID } = req.params;
    try {
      const note = await NoteModel.findOne({ _id: noteID });
      if (req.body.userID === note.userID) {
        await NoteModel.findByIdAndUpdate({ _id: noteID });
        res.json({ msg: `The note with ID:${noteID} has been deleted` });
      }else{
          res.json({ msg: "you don't hae access to delete" });
      }
    } catch (err) {
      res.json({ msg: err });
    }
  });
  

module.exports = {
  noteRouter,
};
