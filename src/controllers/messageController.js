import chatRoomModel from "../schemas/chatRoomSchema.js";
import messageModel from "../schemas/messageSchema.js";

const addMessage = async (data) => {
    const { userID, roomID } = data;

    try {
        const addedMsg = await messageModel.insertMany(data);
        await chatRoomModel.updateOne(
            { code: data.roomID },
            { $push: { messages: addedMsg[0]._id } }
        );
    } catch (er) {
        console.log(er);
    }
};

const getMessages = async (roomID = "123abc") => {
    try {
        const room = await chatRoomModel
            .findOne({ code: roomID })
            .populate({
                path: "messages",
                options: {
                  sort: { time: -1 }, // Sort by time in descending order to get the latest messages first
                  limit: 100, // Limit the number of messages to 100
                },
              });

        const messages = room.messages;

        return messages.sort((a, b) => a.time - b.time);
    } catch (er) {
        console.log(er);
    }
};
export { addMessage, getMessages };
