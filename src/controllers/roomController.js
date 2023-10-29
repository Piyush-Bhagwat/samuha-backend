import chatRoomModel from "../schemas/chatRoomSchema.js";

const createRoom = async (data) => {
    chatRoomModel.insertMany(data);
};

const addMember = async (code, userID) => {
    try {
        const room = await chatRoomModel.find({ code: code });

        if (!room || room.size > 100) {
            return false;
        }
        const updated = await chatRoomModel.updateOne(
            { code: code },
            { $push: { members: userID } }
        );

        if (updated.nModified === 1) {
            // Member added successfully
            return true;
        } else {
            // Member not added (possibly because the code wasn't found)
            return false;
        }
    } catch (error) {
        // Handle any errors that occur during the process
        console.error("Error:", error);
        return false;
    }
};

const doesRoomExist = async (code) => {
    try {
        const room = await chatRoomModel.findOne({ code: code });
        if (room) {
            console.log("Room found", room);
            return true;
        } else {
            console.log("Room not found!!");
            return false;
        }
    } catch (er) {
        console.log(er);
        return false;
    }
};

const deleteMember = async (code, id) => {
    try {
        chatRoomModel.updateOne(
            { _id: code }, // Replace with the chat room's actual ID
            { $pull: { members: id } }
        );
    } catch (error) {
        console.log(error);
    }
};

export { createRoom, addMember, doesRoomExist, deleteMember };
