import chatRoomModel from "../schemas/chatRoomSchema.js";
import userModel from "../schemas/userSchema.js";
import { addMember, deleteMember, doesRoomExist } from "./roomController.js";

const addUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        let dat;
        let userID;

        const isFound = await userModel.findOne({ email: data.email });

        if (!isFound) {
            dat = await userModel.insertMany(data);
            userID = dat[0]._id.toString();

            await addMember(data.code, userID);
            resolve(dat[0]);
        } else {
            resolve(false);
        }
    });
};

const getUser = async (id) => {
    const user = await userModel.findById(id);
    return user;
};

const updateSocket = async (id, socketID) => {
    try {
        await userModel.findByIdAndUpdate(id, { socketID: socketID });
        console.log(id, "Updated socket");
    } catch (er) {
        console.log(er);
        return false;
    }
};

const deleteUser = async (id, code) => {
    // await userModel.findByIdAndDelete(id);
    await deleteMember(id, code);
};

const getAllRooms = async (id) => {
    try {
        const user = await userModel.findById(id);
        if (!user) {
            // Handle the case where the user is not found
            return null;
        }

        // user.rooms is an array of room codes
        const roomCodes = user.rooms;

        // Use the room codes to fetch the complete room data
        const rooms = await chatRoomModel
            .find({ code: { $in: roomCodes } })
            .exec();

        // Return the rooms
        return rooms;
    } catch (err) {
        // Handle any errors that occur during the query
        console.error(err);
        throw err; // Optionally, you can re-throw the error for handling higher up in the call stack
    }
};

const getUserByEmail = async (email, pass) => {
    try {
        const user = await userModel.findOne({ email: email, password: pass });
        console.log(user);
        return user;
    } catch (er) {
        console.log(er);
    }
};

const joinRoom = async (userID, roomID) => {
    const exist = await doesRoomExist(roomID);

    if (exist) {
        await addMember(roomID, userID);

        await userModel.updateOne(
            { _id: userID },
            {
                $push: { rooms: roomID },
            }
        );
        return true;
    } else {
        return false;
    }
};

export {
    addUser,
    getUser,
    updateSocket,
    deleteUser,
    getUserByEmail,
    getAllRooms,
    joinRoom,
};
