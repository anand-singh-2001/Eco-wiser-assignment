import axios from "axios";
import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { useSnackbar } from "notistack";

const NoteContext = createContext({});
const host = "https://note-keeper-jciw.onrender.com/";

export function NoteContextProvider({ children }) {
  const [notes, setNotes] = useState([]);

  const { enqueueSnackbar } = useSnackbar();

  const fetchNotes = useCallback(async () => {
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const result = await axios.get(`${host}/fetchnotes`, {
        headers,
      });

      const notesData = result.data.data;
      notesData.sort((a, b) => b.pinned - a.pinned);
      setNotes(notesData);
    } catch (error) {
      const err = error.response.data.errors;
      err.forEach((er) => enqueueSnackbar(er.msg, { variant: "error" }));
      throw new Error(error);
    }
  }, [enqueueSnackbar]);

  const addNotes = useCallback(
    async (title, tagline, body) => {
      const headers = {
        "Content-Type": "application/json",
      };

      const data = { title, tagline, body };

      try {
        const result = await axios.post(`${host}/addnotes`, data, {
          headers,

          // Things passed to backend as body.
        });

        const newNote = result.data;
        // console.log(newNote);

        setNotes((prev) => [...prev, newNote]);
      } catch (error) {
        console.error(error);
        const err = error.response.data.errors;
        err.forEach((er) => enqueueSnackbar(er.msg, { variant: "error" }));
        throw new Error(error);
      }
    },
    [enqueueSnackbar]
  );

  // Delete a note:
  // Backend logic:
  const deleteNotes = useCallback(
    async (id) => {
      const headers = {
        "Content-Type": "application/json",
      };

      try {
        await axios.delete(`${host}/deletenotes/${id}`, {
          headers,
        });

        setNotes((prev) => prev.filter((note) => note._id !== id));
      } catch (error) {
        console.error(error);
        const err = error.response.data.errors;
        err.forEach((er) => enqueueSnackbar(er.msg, { variant: "error" }));
      }
    },
    [enqueueSnackbar]
  );

  // Edit a book:
  // Backend logic:
  const updateNotes = useCallback(
    async (id, title, tagline, body) => {
      const headers = {
        "Content-type": "application/json",
      };
      const data = { title, tagline, body };

      try {
        await axios.put(`${host}/updatenotes/${id}`, data, {
          headers,
        });

        setNotes((prev) =>
          prev.map((item) =>
            item._id === id ? { ...item, title, tagline, body } : item
          )
        );
      } catch (error) {
        console.log(error);
        const err = error.response.data.errors;
        err.forEach((er) => enqueueSnackbar(er.msg, { variant: "error" }));
        throw new Error(error);
      }
    },
    [enqueueSnackbar]
  );

  const setPinned = useCallback(
    async (note) => {
      console.log(note.title);
      const headers = {
        "Content-type": "application/json",
      };

      try {
        await axios.put(`${host}/updatenotes/${note._id}`, note, {
          headers,
        });
      } catch (error) {
        console.log(error);
        enqueueSnackbar(error.response.data.error, { variant: error });
        throw new Error(error);
      }
    },
    [enqueueSnackbar]
  );

  const addPinned = useCallback(
    async (note, id) => {
      await setPinned(note);
      setNotes((prev) => {
        const clone = [...prev];
        clone.splice(0, 0, clone.splice(id, 1));
        console.log(clone.flat());
        return clone.flat();
      });
    },
    [setPinned]
  );
  const removePinned = useCallback(
    async (note, id) => {
      await setPinned(note);
      setNotes((prev) => {
        const clone = [...prev];
        clone[id] = note;
        clone.sort((a, b) => b.pinned - a.pinned);
        return clone;
      });
    },
    [setPinned]
  );
  const value = useMemo(
    () => ({
      notes,
      fetchNotes,
      addNotes,
      deleteNotes,
      updateNotes,
      removePinned,
      addPinned,
    }),
    [
      addNotes,
      addPinned,
      deleteNotes,
      fetchNotes,
      notes,
      removePinned,
      updateNotes,
    ]
  );

  return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>;
}

// export  NoteContextProvider;

export const useNoteContext = () => useContext(NoteContext);

NoteContextProvider.propTypes = { children: PropTypes.node };
