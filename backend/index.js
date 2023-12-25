import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import expressfileupload from 'express-fileupload';
import { dbConnect } from './database/db.js';
import userRoute from './routes/userRoute.js';

const app = express();
app.use(express.json());
app.use(express.static('public', { type: 'module' }));

dotenv.config();
app.use(cors());
app.use(expressfileupload({
    useTempFiles: false,
    tempFileDir: 'public/'
}));

const PORT = process.env.PORT || 3000;

dbConnect();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use("/user", userRoute);

app.use("/user-image", express.static('images/userImage'));

