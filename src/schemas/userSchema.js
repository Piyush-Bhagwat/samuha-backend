import { Schema, model } from "mongoose";

const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    rooms: [String],
});

const userModel = model("user", userSchema);

export default userModel;
