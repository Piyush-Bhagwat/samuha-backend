import { Router } from "express";
import { createRoom, doesRoomExist } from "../controllers/roomController.js";

const router = Router();

router.post("/createRoom", async (req, res) => {
    const data = req.body;
    // console.log(data);
    await createRoom(data);

    res.send("room-created");
});

router.get("/roomExist", async (req, res) => {
    const roomID = req.query.id;

    doesRoomExist(roomID).then((exist) => {
        if (exist) {
            res.send("true");
        } else {
            res.send("false");
        }
    });
});

export { router };
