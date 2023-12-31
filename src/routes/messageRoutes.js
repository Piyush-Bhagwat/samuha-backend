import { Router } from "express";
import { addMessage, getMessages } from "../controllers/messageController.js";
import { isUserMember } from "../controllers/roomController.js";

const messageRouter = Router();

messageRouter.post("/add", async (req, res) => {
    try {
        const data = req.body;
        const { roomID, userID } = data;
        const isMember = await isUserMember(roomID, userID);
        if (!isMember) {
            res.send("no-permission");
            return;
        }

        if (data) {
            addMessage(data);
        }

        res.send("sent");
    } catch (er) {
        console.log(er);
        res.status(404);
    }
});

messageRouter.get("/getRoomMsg", async (req, res) => {
    try {
        const roomID = req.query.id;

        getMessages(roomID).then((msg) => {
            res.send(msg);
        });
    } catch (er) {
        res.status(404);
    }
});

export { messageRouter };
