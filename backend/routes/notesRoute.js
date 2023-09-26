import { Router } from "express";
import Note from "../models/NotesModel.js";
const router = Router();

//Route for adding a new book:
router.post("/addnotes", async (request, response) => {
  const { title, tagline, body, pinned } = request.body;

  // console.log("UserId", request.user.id);
  // const user = request.user.id;

  const note = await Note.create({
    title,
    tagline,
    body,
    pinned,
  }); //creating a new book.

  return response.status(201).send(note);
});

//Route for getting all the books from the database for the specific user:

router.get("/fetchnotes", async (request, response) => {
  try {
    const notes = await Note.find(); //getting all the books from the database.

    return response.status(200).send({
      count: notes.length,
      data: notes,
    });
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error.message });
  }
});

// Route to find a specific book from database by id:

// router.get("/getbook/:id", async (request, response) => {
//   const { id } = request.params;
//   try {
//     const book = await Note.findById(id); //getting the book from the database.

//     return response.status(200).send(book);
//   } catch (error) {
//     console.log(error);
//     response.status(500).send({ message: error.message });
//   }
// });

//Route to update an existing book:

router.put("/updatenotes/:id", async (request, response) => {
  try {
    if (!request.body.title || !request.body.tagline || !request.body.body) {
      return response
        .status(400)
        .send({ message: `Please fill all the required fields` });
    }
    const { id } = request.params;

    await Note.findByIdAndUpdate(id, request.body, {
      new: true,
    }); //request.body is the passed as it will be used to update the specific book. new:true- shows the updated book rather than the previous one.

    return response.status(200).send({ message: `Note updated successfuly` });
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error.message });
  }
});

// Route to delete a book:

router.delete("/deletenotes/:id", async (request, response) => {
  try {
    const { id } = request.params;
    // const note = await Note.findById(id);

    // //Checking if the book exists:
    // if (!note) {
    //   return response.status(404).send({ message: `Note not found` });
    // }

    await Note.findByIdAndDelete(id);

    return response.status(200).send({ message: `Note deleted successfuly` });
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error.message });
  }
});

export default router;
