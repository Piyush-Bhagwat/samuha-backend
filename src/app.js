import { createServer } from "node:http";
import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import { router as roomRoute } from "./routes/roomRoutes.js";
import { router as userRoute } from "./routes/userRoute.js";
import { messageRouter } from "./routes/messageRoutes.js";
import { config } from "dotenv";

const app = express();
const server = createServer(app);

app.use(cors());
export const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
    },
});

app.use(express.json());

app.use("/api/room", roomRoute);
app.use("/api/user", userRoute);
app.use("/api/msg", messageRouter);

app.get("/", (req, res)=>{
    res.send("Welcome to Backend") 
})
config();

export default server;
