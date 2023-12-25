import noteModel from '../Models/noteModel.js';

export const getAllNote = async (req, res) => {

    try {
        const userId = req.userInfo;
        const notes = await noteModel.find({ userId });
        res.status(201).json({
            notes: notes
        });
    } catch (error) {
        res.status(400).json({
            error_message: 'Something went wrong ' + error
        });
    }

};

export const newNote = async (req, res) => {

    try {
        const userId = req.userInfo;
        const title = req.body.title;
        const desc = req.body.desc;
        const dateTime = new Date();
        const date = dateTime.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
        const newNote = new noteModel({
            userId,
            title,
            desc,
            date
        });

        console.log(newNote);

        await newNote.save();

        res.status(201).json({
            success_message: 'Note added successfully'
        });
    } catch (error) {
        res.status(400).json({
            error_message: 'Something went wrong ' + error
        });
    }
};

export const updateNote = async (req, res) => {

    try {

        const userId = req.userInfo;
        const noteId = req.params.noteId;
        const title = req.body.title;
        const desc = req.body.desc;
        const isCompleted = req.body.isCompleted;
        const dateTime = new Date();
        const date = dateTime.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

        // console.log(noteId);
        const note = await noteModel.findOne({ _id: noteId });
        console.log(typeof note.userId);
        console.log(typeof userId);
        if (note.userId === userId) {

            const updatedNote = await noteModel.findByIdAndUpdate(
                noteId,
                { title, desc, isCompleted, date },
                { new: true }
            );

            if (!updatedNote) {
                return res.status(404).json({
                    error_message: 'Note not found'
                });
            }
        } else {
            return res.status(404).json({
                error_message: 'Note not found..'
            });
        }

        return res.status(200).json({
            success_message: 'Note updated successfully',
            updatedNote
        });
    } catch (error) {
        res.status(400).json({
            error_message: 'Something went wrong ' + error
        });
    }

};

export const deleteNote = async (req, res) => {
    try {
        const userId = req.userInfo;
        const noteId = req.params.noteId;

        const note = await noteModel.findOne({ _id: noteId });

        if (note) {

            if (note.userId == userId) {

                const deletedNote = await noteModel.findByIdAndDelete(noteId);
                if (!deletedNote) {
                    return res.status(404).json({
                        error_message: 'Note not deleted'
                    });
                } else {
                    return res.status(200).json({
                        success_message: 'Note deleted successfully',
                    });
                }
            }
        } else {
            return res.status(404).json({
                error_message: 'Note not found..'
            });
        }
    } catch (error) {
        res.status(400).json({
            error_message: 'Something went wrong ' + error
        });
    }
};

