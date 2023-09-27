import { useContext } from "react";
import { NoteContext } from "../Context/NoteContext";

export const useNoteContext = () => useContext(NoteContext);
