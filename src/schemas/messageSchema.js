import { Schema, model } from "mongoose";

const messageSchema = new Schema({
    message: String,
    time: Date,
    userID: String,
    roomID: String,
    username: String
});

const messageModel = model("message", messageSchema);

export default messageModel;
