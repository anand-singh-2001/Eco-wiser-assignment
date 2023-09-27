import NotesContainer from "../components/Home/NotesContainer";

const Notes = () => {
  return (
    <div className="p-4 ">
      <div className="flex justify-center">
        <div style={{ fontSize: "40px" }}>Your Notes</div>
      </div>

      <NotesContainer />
    </div>
  );
};

export default Notes;
