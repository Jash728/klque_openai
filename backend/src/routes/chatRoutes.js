import express from 'express';
import Chat from '../models/chat.js';
import { v4 as uuidv4 } from 'uuid'; 

const router = express.Router();


router.post("/", async (req, res) => {
  const { prompt, response } = req.body;

  try {
    
    const newChat = new Chat({
      chatId: uuidv4(), 
      prompt,
      response,
    });

   
    await newChat.save();
    res.status(201).json(newChat); 
  } catch (error) {
    console.error("Error saving chat:", error);
    res.status(500).json({ message: "Failed to save chat", error: error.message });
  }
});


router.get("/", async (req, res) => {
  try {
    const chats = await Chat.find().sort({ date: -1 }); 
    res.status(200).json(chats);
  } catch (error) {
    console.error("Error fetching chat history:", error);
    res.status(500).json({ message: "Failed to fetch chat history" });
  }
});

export default router;
