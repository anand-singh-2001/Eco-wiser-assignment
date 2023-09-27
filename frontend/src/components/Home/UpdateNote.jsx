import { AiOutlineClose } from "react-icons/ai";
import { PiBookOpenTextLight } from "react-icons/pi";
import PropTypes from "prop-types";
import { useSnackbar } from "notistack";
import { useNoteContext } from "../../hook/useNoteContext";
import { useState } from "react";
import Loading from "../Loading";

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
        className="lg:w-[600px] md:w-[600px] sm:w-[600px] xs:w-[95%] max-w-full h-[90%]  bg-white rounded-xl p-2 flex flex-col relative"
        onClick={(e) => e.stopPropagation()}>
        <AiOutlineClose
          className="absolute right-6 top-6 text-3xl text-red-600 z-10 cursor-pointer"
          onClick={onClose}
        />

        {loading ? (
          <Loading />
        ) : (
          <div className="lg:w-[600px] md:w-[600px] sm:w-[600px]  xs:w-[100vw] min-w-[350px] max-w-full  h-[100%] bg-white rounded-xl p-2 flex flex-col relative">
            <div
              className="w-fit  py-1 min-h-[50px] rounded-lg overflow-hidden "
              style={{ minHeight: "40px" }}>
              <input
                type="text"
                value={note.title}
                name="title"
                onChange={handleChange}
                style={{ fontSize: "40px" }}
                className="border-2 border-gray-500 px-4 py-2 w-full border-none outline-none "
              />
            </div>
            <div
              className=" min-h-[50px] text-gray-500 overflow-hidden "
              style={{ minHeight: "40px" }}>
              <input
                type="text"
                value={note.tagline}
                name="tagline"
                onChange={handleChange}
                style={{ fontSize: "20px" }}
                className="border-2 border-gray-500 px-4 pb-2 w-full border-none outline-none m-[10px]"
              />
            </div>

            <div className="flex justify-start items-center-gap-x-2 h-[100%] min-h-[200px] ">
              <PiBookOpenTextLight className="text-red-300 text-2xl" />
              <div className="px-2 w-[100%] min-h-[100%] overflow-hidden">
                <textarea
                  type="text"
                  value={note.body}
                  name="body"
                  onChange={handleChange}
                  className="border-2 border-gray-500 px-4 py-2 w-full h-full border-none outline-none "
                />
              </div>
            </div>
            <button
              className="p-2 bg-sky-300 m-2 overflow-hidden"
              onClick={handleEditNote}>
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
