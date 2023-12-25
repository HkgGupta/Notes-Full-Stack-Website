import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    photo: {
        type: Array,
        default: null
    },
    password: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    }
);

const userModel = mongoose.model("user", userSchema);

export default userModel;