import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from "../Models/userModel.js";

export const userDetails = async (req, res) => {
    try {
        const userId = req.userInfo;
        const user = await userModel.findById({ _id: userId }).select('_id name email phone photo createdAt updatedAt');

        if (!user) {
            return res.status(404).json({
                error_message: 'User not found'
            });
        }
        return res.status(200).json({
            success_message: user
        });
    } catch (error) {
        return res.status(400).json({
            error_message: "Something went wrong"
        });
    }

};


export const userRegister = async (req, res) => {

    try {
        const name = req.body.name;
        const email = req.body.email;
        const phone = req.body.phone;
        const photo = req.files.photo;
        const password = req.body.password;

        const user = await userModel.findOne({ email: email });

        if (user) {

            return res.status(409).json({
                error_message: 'User already exists',
            });
        } else {

            // const imageData = Buffer.from(photo.data).toString('base64');

            // let userImg;
            // if ((photo.mimetype === "image/jpg") || (photo.mimetype === "image/png") || (photo.mimetype === "image/jpeg")) {

            //     userImg = Date.now() + "-" + photo.name;
            //     const newPath = path.join(process.cwd(), "images/userImage", userImg);
            //     await photo.mv(newPath);
            // }
            // else {
            //     return res.status(400).json({
            //         error_message: "File Type Error - Only Image Formats are allowed"
            //     });
            // }

            const hashedPassword = await bcrypt.hash(password, 10);
            const saveUser = new userModel({
                name: name,
                email: email,
                phone: phone,
                photo: photo,
                password: hashedPassword
            });

            await saveUser.save();

            return res.status(201).json({
                success_message: 'User registered successfully'
            });
        }
    } catch (error) {
        return res.status(500).json({
            error_message: "Something Went Wrong " + error
        });
    }
};

export const userLogin = async (req, res) => {

    try {
        const email = req.body.email;
        const password = req.body.password;

        const user = await userModel.findOne({ email: email });

        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({
                    error_message: 'Invalid password'
                });
            }

            const token = jwt.sign({ credential: user._id }, process.env.USER_SECRET_KEY, { expiresIn: '7d' });

            return res.status(200).json({
                success_message: "User Logged In",
                token: token
            });
        } else {
            return res.status(401).json({
                error_message: 'Invalid username'
            });
        }
    } catch (error) {
        return res.status(500).json({
            error_message: "Something Went Wrong " + error
        });
    }
};

