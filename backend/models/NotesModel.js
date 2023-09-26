import { Schema, model } from "mongoose";

const NotesSchema = new Schema(
  {
    //creating a schema
    title: {
      type: String,
      required: true,
    },
    tagline: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    pinned: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true, //provides the timestamps in our database.
  }
);

const Note = model("notes", NotesSchema); //takes the name for the model and the schema created.
export default Note;
