import mongoose from "mongoose";


export const dbConnect = async () => {

    const DB_URL = process.env.DB_URL;

    try {
        await mongoose.connect(DB_URL);
        console.log("DB Connected");
    } catch (error) {
        console.log("DB Error " + error);
    }
};