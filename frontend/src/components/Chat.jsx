import React, { useState } from "react";
import axios from "axios";

const Chat = () => {
    const [response, setResponse] = useState("");

    const generateText = async () => {
        try {
            const res = await axios.post("http://localhost:11434/api/generate", {
                model: "llama3.2",
                prompt: "Why is the sky blue?",
            });
            setResponse(res.data);
        } catch (error) {
            console.error("Error calling Ollama API:", error);
        }
    };

    return (
        <div>
            <button onClick={generateText}>Generate Text</button>
            <pre>{response && JSON.stringify(response, null, 2)}</pre>
        </div>
    );
};

export default Chat;
