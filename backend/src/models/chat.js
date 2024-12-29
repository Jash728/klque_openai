import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    chatId: {
        type: String,
        required: true, 
    },
    prompt: {
        type: String,
        required: true, 
    },
    response: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now, 
    },
});

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
