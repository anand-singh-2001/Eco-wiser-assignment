import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNoteContext } from "../../Context/NoteContext";
import { useState } from "react";
import { Pagination } from "@mui/material";
import { MdOutlineDelete } from "react-icons/md";
import DeleteNote from "./DeleteNote";
import UpdateNote from "./UpdateNote";
import CreateNote from "./CreateNote";
import { BsFillPlusCircleFill, BsPinAngleFill } from "react-icons/bs";

export default function Notes_Container() {
  const { notes, removePinned, addPinned } = useNoteContext();
  const [createModal, setCreateModal] = useState(false);

  const [page, setPage] = useState(1);
  const [deleteModal, setDeleteModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [currNote, setCurrNote] = useState("");

  const handleClick = (note, id) => {
    if (note.pinned) {
      note.pinned = false;
      removePinned(note, id);
    } else {
      note.pinned = true;
      addPinned(note, id);
    }
  };

  return (
    <div className="lg:w-[65%] md:w-[95%] sm:w-[90%] xs:w-[80%] lg:h-[70%] md:h-[72%] text-center justify-center m-auto mt-[20px]">
      <BsFillPlusCircleFill
        onClick={() => setCreateModal(true)}
        style={{
          cursor: "pointer",
          textShadow: "0 0 3px black",
          marginLeft: "auto",
        }}
        size={50}
        color="black"
      />
      {notes.length === 0 && (
        <h1 style={{ fontSize: "40px", margin: "auto" }}>
          Empty here....Add your notes.
        </h1>
      )}
      <div className="my-2 grid lg:grid-rows-2 md:grid-rows-2 sm:grid-rows-3 xs:grid-rows-6 lg:grid-cols-3 md:grid-cols-3 gap-3 sm:grid-cols-2 max-xs:grid-cols-2  border-separate border-spacing-2 bg-opacity-80">
        {notes?.slice((page - 1) * 6, (page - 1) * 6 + 6).map((note, id) => (
          <Box key={id} sx={{ height: "200px", minWidth: "200px" }}>
            <Card
              variant="outlined"
              sx={{
                background: "none",
                backgroundColor:
                  "rgb(" +
                  Math.floor(Math.random() * (256 - 100) + 100) +
                  "," +
                  Math.floor(Math.random() * (256 - 100) + 100) +
                  "," +
                  Math.floor(Math.random() * (256 - 100) + 100) +
                  ")",

                color: "black",
                border: "1px solid white",
                height: "200px",
                borderRadius: "8px",
                backdropFilter: "brightness(150%)",
              }}>
              <CardActions
                sx={{
                  textShadow: "0 0 3px white",
                  cursor: "pointer",
                  zIndex: 20,
                }}>
                <Button size="small">
                  {" "}
                  <BsPinAngleFill
                    className={
                      note.pinned
                        ? "text-2xl text-black"
                        : "text-2xl text-white"
                    }
                    onClick={() => handleClick(note, id)}
                  />
                </Button>
              </CardActions>

              <CardContent
                sx={{
                  cursor: "pointer",
                  height: "95%",
                  marginTop: "-15px",
                  padding: "0px 5px !important",
                  zIndex: 10,

                  fontWeight: 900,
                }}
                onClick={() => {
                  setUpdateModal(true);
                  setCurrNote(note);
                }}>
                <Typography sx={{ fontSize: 14 }} gutterBottom>
                  {note?.tagline / length > 20
                    ? note.tagline.substr(0, 20) + "..."
                    : note.tagline}
                </Typography>
                <Typography sx={{ fontSize: "25px" }}>
                  {note?.title.legth > 20
                    ? note.title.substr(0, 20) + "..."
                    : note.title}
                </Typography>

                <Typography
                  sx={{
                    paddingTop: "5px",
                    fontSize: "20px",
                    padding: "0 10px",
                  }}>
                  {note?.body.length > 20
                    ? note.body.substr(0, 20) + "..."
                    : note.body}
                </Typography>
              </CardContent>
              <CardActions
                sx={{
                  marginTop: "-80px",
                  textShadow: "0 0 3px white",
                  zIndex: 20,
                }}>
                <Button size="small">
                  <MdOutlineDelete
                    className="text-2xl text-black"
                    onClick={() => {
                      setDeleteModal(true);
                      setCurrNote(note);
                    }}
                    style={{
                      cursor: "pointer",
                    }}
                  />
                </Button>
              </CardActions>
            </Card>
          </Box>
        ))}
      </div>
      {notes.length > 6 && (
        <Pagination
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            zIndex: 10,
          }}
          count={Math.ceil(notes?.length / 6)}
          onChange={(_, value) => {
            setPage(value);
          }}
        />
      )}

      {createModal === true && (
        <CreateNote
          onClose={() => {
            setCreateModal(false);
          }}
        />
      )}

      {deleteModal === true && (
        <DeleteNote
          currNote={currNote}
          onClose={() => {
            setDeleteModal(false);
          }}
        />
      )}

      {updateModal === true && (
        <UpdateNote
          currNote={currNote}
          onClose={() => {
            setUpdateModal(false);
          }}
        />
      )}
    </div>
  );
}
