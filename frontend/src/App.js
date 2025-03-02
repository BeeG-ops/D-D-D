import React, { useState } from "react";
import { encryptMessage, decryptMessage } from "./Encryptor";

function App() {
    const [inputText, setInputText] = useState("");
    const [encryptedData, setEncryptedData] = useState("");
    const [decryptedData, setDecryptedData] = useState("");

    // Send Encrypted Message to Backend
    const sendMessage = async () => {
        const payload = encryptMessage(inputText);
        const response = await fetch("https://your-backend-url.vercel.app/store", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        if (response.ok) {
            setEncryptedData(payload.encrypted_data);
            setInputText("");
        }
    };

    // Retrieve & Decrypt Message
    const retrieveMessage = async (messageId) => {
        const response = await fetch(`https://your-backend-url.vercel.app/retrieve/${messageId}`);
        if (response.ok) {
            const data = await response.json();
            setDecryptedData(decryptMessage(data.encrypted_data));
        }
    };

    return (
        <div>
            <h2>Secure Digital Dead Drop</h2>
            <textarea value={inputText} onChange={(e) => setInputText(e.target.value)} />
            <button onClick={sendMessage}>Encrypt & Send</button>
            
            {encryptedData && <p>Encrypted: {encryptedData}</p>}

            <input type="number" placeholder="Enter Message ID" onBlur={(e) => retrieveMessage(e.target.value)} />
            {decryptedData && <p>Decrypted: {decryptedData}</p>}
        </div>
    );
}

export default App;