import { Schema, model } from "mongoose";

const roomSchema = new Schema({
    code: { type: String, unique: true },
    name: String,
    adminID: String,
    adminName: String,
    messages: [{ type: Schema.Types.ObjectId, ref: "message" }],
    members: [{ type: String }],
    size: Number,
});

const chatRoomModel = model("room", roomSchema);

export default chatRoomModel;
