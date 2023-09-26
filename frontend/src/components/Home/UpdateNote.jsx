import { AiOutlineClose } from "react-icons/ai";
import PropTypes from "prop-types";
import { useSnackbar } from "notistack";
import { useNoteContext } from "../../Context/NoteContext";
import { useState } from "react";
import Spinner from "../Spinner";

const UpdateNote = ({ currNote, onClose }) => {
  const [note, setNote] = useState(currNote);
  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const { updateNotes } = useNoteContext();

  const handleEditNote = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await updateNotes(currNote._id, note.title, note.tagline, note.body);
      setLoading(false);
      enqueueSnackbar("Note Edited Successfully", { variant: "success" });
      onClose();
    } catch (error) {
      setLoading(false);
      enqueueSnackbar(
        "Some error occured, please check the console for more info.",
        { variant: "error" }
      );
      console.log(error);
    }
    // }
  };

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div
      className="fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center"
      onClick={onClose}>
      <div
        className="lg:w-[600px] md:w-[600px] sm:w-[600px] xs:w-[95%] max-w-full lg:h-[95%] md:h-[100%] xs:h-[90%] sm:h-[90%]  bg-white rounded-xl p-4 flex flex-col relative"
        onClick={(e) => e.stopPropagation()}>
        <AiOutlineClose
          className="absolute right-6 top-6 text-3xl text-red-600 cursor-pointer"
          onClick={onClose}
        />
        <h1 className="text-3xl mb-[20px] overflow-hidden">Your note</h1>
        {loading ? (
          <Spinner />
        ) : (
          <div className="flex flex-col border-2 border-sky-400 rounded-xl h-[100%] lg:w-[500px] md:w-[500px] sm:w-[500px] xs:w-[90vw] p-4 text-start m-auto">
            <div className=" min-h-[50px]">
              <label className="text-xl mr-4 text-gray-500">Title</label>
              <input
                type="text"
                value={note.title}
                name="title"
                onChange={handleChange}
                className="border-2 border-gray-500 px-4 py-2 w-full"
              />
            </div>
            <div className=" min-h-[50px]">
              <label className="text-xl mr-4 text-gray-500">Tagline</label>
              <input
                type="text"
                value={note.tagline}
                name="tagline"
                onChange={handleChange}
                className="border-2 border-gray-500 px-4 py-2 w-full "
              />
            </div>
            <div className="min-h-[50px]">
              <label className="text-xl mr-4 text-gray-500">Body</label>
              <textarea
                type="text"
                value={note.body}
                name="body"
                onChange={handleChange}
                className="border-2 border-gray-500 px-4 py-2 w-full h-[180px] "
              />
            </div>

            <button className="p-2 bg-sky-300 m-8" onClick={handleEditNote}>
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateNote;

UpdateNote.propTypes = {
  currNote: PropTypes.node,
  onClose: PropTypes.ReactNode,
};
