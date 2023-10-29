import { Router } from "express";
import {
    addUser,
    deleteUser,
    getAllRooms,
    getUser,
    getUserByEmail,
    joinRoom,
    leaveRoom,
    updateSocket,
} from "../controllers/userController.js";

const router = Router();

router.post("/addUser", async (req, res) => {
    try {
        const data = req.body;

        addUser(data).then((data) => {
            console.log("User Added: ", data);
            if (data) {
                res.status(200).send(data);
                return;
            } else {
                res.send("user-exist");
                return;
            }
        });
    } catch (er) {
        console.log(er);
        res.send(404);
    }
});

router.get("/getUser", async (req, res) => {
    try {
        const id = req.query.id;

        if (id) {
            getUser(id).then((data) => {
                res.send(data);
            });
        }
    } catch (er) {
        console.log(er);
        res.send("no-user");
    }
});

router.get("/getUserByEmail", async (req, res) => {
    const email = req.query.email;
    const pass = req.query.pass;
    getUserByEmail(email, pass).then((user) => {
        if (user) {
            res.send(user);
        } else {
            res.send("no-user");
        }
    });
});

router.put("/updateSocket", async (req, res) => {
    const userID = req.query.id;
    const socketID = req.query.socketID;

    updateSocket(userID, socketID);
    res.send("updated");
});

router.delete("/deleteUser", async (req, res) => {
    const userID = req.query.id;
    const code = req.query.code;
    await deleteUser(userID, code);
    res.send("deleted");
});

router.get("/getRooms", async (req, res) => {
    const id = req.query.id;
    const dat = await getAllRooms(id);
    // console.log(dat);
    if (dat) {
        res.send(dat);
    } else {
        res.send("NaN");
    }
});

router.put("/joinRoom", async (req, res) => {
    const userID = req.query.userID;
    const roomID = req.query.roomID;

    const joint = await joinRoom(userID, roomID);

    if (joint) {
        res.send("joined");
    } else {
        res.send("no-room");
    }
});

router.delete("/leaveRoom", async (req, res) => {
    const userID = req.query.userID;
    const roomID = req.query.roomID;

    await leaveRoom(userID, roomID);

    res.send("left");
});

export { router };
