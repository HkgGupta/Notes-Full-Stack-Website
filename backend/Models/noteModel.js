import mongoose from "mongoose";

const noteSchema = mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        default: null
    },
    date: {
        type: String,
        default: null
    },
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    }

});

const noteModel = mongoose.model("note", noteSchema);
export default noteModel;