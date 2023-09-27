import axios from "axios";
import PropTypes from "prop-types";
import { createContext, useCallback, useMemo, useState } from "react";
import { useSnackbar } from "notistack";

export const NoteContext = createContext({ notes: [] });

const host = import.meta.env.VITE_APP_HOST;

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
        setNotes((prev) => prev.filter((note) => note._id !== id));
        await axios.delete(`${host}/deletenotes/${id}`, {
          headers,
        });
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
        // console.log(error);
        const err = error.response.data.errors;
        err.forEach((er) => enqueueSnackbar(er.msg, { variant: "error" }));
        throw new Error(error);
      }
    },
    [enqueueSnackbar]
  );

  const setPinned = useCallback(
    async (note) => {
      // console.log(note.title);
      const headers = {
        "Content-type": "application/json",
      };

      try {
        await axios.put(`${host}/updatenotes/${note._id}`, note, {
          headers,
        });
      } catch (error) {
        // console.log(error);
        enqueueSnackbar(error.response.data.error, { variant: error });
        throw new Error(error);
      }
    },
    [enqueueSnackbar]
  );

  const updatePinned = useCallback(
    async (note) => {
      setNotes((prev) => {
        const clone = [...prev];
        const index = clone.findIndex((item) => item._id === note._id);
        if (index !== -1) {
          clone[index] = note;
        }
        clone.sort((a, b) => b.pinned - a.pinned);
        return clone;
      });
      await setPinned(note);
    },
    [setPinned]
  );

  console.log(notes, "context notes");
  const value = useMemo(
    () => ({
      notes,
      fetchNotes,
      addNotes,
      deleteNotes,
      updateNotes,
      updatePinned,
    }),
    [addNotes, updatePinned, deleteNotes, fetchNotes, notes, updateNotes]
  );

  return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>;
}

// export  NoteContextProvider;

NoteContextProvider.propTypes = { children: PropTypes.node };
