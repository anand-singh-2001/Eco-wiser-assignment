import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { useNoteContext } from "../Context/NoteContext";
import Notes_Container from "../components/Home/Notes_Container";

const Notes = () => {
  const [loading, setLoading] = useState(false);
  const { fetchNotes } = useNoteContext();

  useEffect(() => {
    setLoading(true);
    fetchNotes();
    setLoading(false);
  }, [fetchNotes]);

  return (
    <div className="p-4 ">
      <div className="flex justify-center">
        <div style={{ fontSize: "40px" }}>Your Notes</div>
      </div>

      {loading ? <Spinner /> : <Notes_Container />}
    </div>
  );
};

export default Notes;
