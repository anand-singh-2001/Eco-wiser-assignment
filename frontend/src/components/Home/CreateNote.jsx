import { AiOutlineClose } from "react-icons/ai";
import PropTypes from "prop-types";
import { useSnackbar } from "notistack";
import { useNoteContext } from "../../Context/NoteContext";
import { useState } from "react";
import Spinner from "../Spinner";

const CreateNote = ({ onClose }) => {
  const [notes, setNotes] = useState({
    title: "",
    tagline: "",
    body: "",
  });
  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const { addNotes } = useNoteContext();

  const handleSaveNote = async (e) => {
    e.preventDefault();
    if (!notes.title || !notes.tagline || !notes.body) {
      enqueueSnackbar("Please fill all the fields correctly.", {
        variant: "error",
      });
    } else {
      try {
        setLoading(true);

        await addNotes(notes.title, notes.tagline, notes.body);

        setLoading(false);
        enqueueSnackbar("Book Created Successfully", { variant: "success" });

        onClose();
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
  };

  const handleChange = (e) => {
    setNotes((prev) => ({ ...prev, [e.target.name]: e.target.value })); //Handle the type changes.
  };
  return (
    <div
      className="fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center "
      onClick={onClose}>
      <div
        className="lg:w-[600px] md:w-[600px] sm:w-[600px] xs:w-[100vw] max-w-full lg:h-[95vh] md:h-[95%] sm:h-[90%] xs:h-[90%]  bg-white rounded-xl p-4 flex flex-col relative"
        onClick={(e) => e.stopPropagation()}>
        <AiOutlineClose
          className="absolute right-6 top-6 text-3xl text-red-600 cursor-pointer"
          onClick={onClose}
        />

        <h1 className="text-3xl mb-[20px] overflow-hidden">Add a note.</h1>

        <div className="flex flex-col border-2 border-sky-400 rounded-xl h-[100%] lg:w-[500px] md:w-[500px] sm:w-[500px] xs:w-[90vw] min-w-[320px] p-4 mx-auto">
          {loading ? (
            <Spinner />
          ) : (
            <>
              <div className=" min-h-[50px] text-start">
                <label className="text-xl mr-4 text-gray-500">Title</label>
                <input
                  type="text"
                  value={notes.title}
                  name="title"
                  onChange={handleChange}
                  className="border-2 border-gray-500 px-4 py-2 w-full"
                />
              </div>
              <div className="min-h-[50px] text-start">
                <label className="text-xl mr-4 text-gray-500">Tagline</label>
                <input
                  type="text"
                  value={notes.tagline}
                  name="tagline"
                  onChange={handleChange}
                  className="border-2 border-gray-500 px-4 py-2 w-full"
                />
              </div>
              <div className=" min-h-[50px] text-start">
                <label className="text-xl mr-4 text-gray-500">Body</label>
                <textarea
                  type="text"
                  value={notes.body}
                  name="body"
                  onChange={handleChange}
                  style={{ overflowY: "scroll" }}
                  className="border-2 border-gray-500 px-4 py-2 w-full h-[180px]"
                />
              </div>

              <button className="p-2 bg-sky-300 m-8" onClick={handleSaveNote}>
                Save
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateNote;

CreateNote.propTypes = { currBook: PropTypes.node, onClose: PropTypes.node };
