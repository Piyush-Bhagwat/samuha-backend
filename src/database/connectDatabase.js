import { connect } from "mongoose";

const connectToDB = async () => {
    try {
        await connect(process.env.MONGO_URL);
        console.log("DB connected! 🤝");
    } catch (er) {
        console.log(er);
    }
};

export {connectToDB}    