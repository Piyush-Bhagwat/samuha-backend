import { config } from "dotenv";
import { connectToDB } from "./src/database/connectDatabase.js";
import chatRoomModel from "./src/schemas/chatRoomSchema.js";
import server, { io } from "./src/app.js";

//connection
const port = process.env.PORT || 5000;

const seeForChanges = () => {
    const chatStream = chatRoomModel.watch();

    chatStream.on("change", () => {
        io.emit("roomUpdate");
    });
};

io.on("connection", (s) => {
    //looking for connections
    console.log("User Connected", s.id);

    s.on("user-disconnected", (id) => {
        // deleteUser(id);
        console.log("Disconnect ID:  ", id);
    });

    s.on("disconnect", () => {
        console.log("Disconnected", s.id);
    });
});

connectToDB().then(() => {
    server.listen(port, () => {
        console.log("Server started on", port);
    });

    // getMessages()
    seeForChanges();
});
