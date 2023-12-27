import express from 'express';
import { userDetails, userLogin, userRegister } from '../controller/user.js';
import { deleteNote, getAllNote, newNote, updateNote } from '../controller/note.js';
import { userCheckAuth } from '../middleware/userAuth.js';

const userRoute = express.Router();

userRoute.get("/details", userCheckAuth, userDetails);
userRoute.post("/register", userRegister);
userRoute.post("/login", userLogin);
userRoute.get("/notes", userCheckAuth, getAllNote);
userRoute.post("/new-note", userCheckAuth, newNote);
userRoute.put("/note-update", userCheckAuth, updateNote);
userRoute.delete("/note-delete/:noteId", userCheckAuth, deleteNote);

export default userRoute;