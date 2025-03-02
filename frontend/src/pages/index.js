import { useState } from "react";
import { storeMessage } from "../api";
import CryptoJS from "crypto-js";
import QRCode from "qrcode.react";

export default function Home() {
    const [message, setMessage] = useState("");
    const [encryptedMessage, setEncryptedMessage] = useState(null);
    const [messageId, setMessageId] = useState(null);
    const [error, setError] = useState(null);

    // 🔐 Encrypt Message (AES-256)
    const encryptMessage = (msg) => {
        const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY;
        return CryptoJS.AES.encrypt(msg, secretKey).toString();
    };

    // 🚀 Submit Message
    const handleSubmit = async () => {
        if (!message.trim()) return;
        const encrypted = encryptMessage(message);
        try {
            const response = await storeMessage(encrypted);
            setMessageId(response.message_id);
            setEncryptedMessage(encrypted);
            setMessage("");
        } catch (err) {
            setError("Failed to store message.");
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
            <h1 className="text-2xl font-bold mb-4">🕵 Digital Dead Drop</h1>
            <textarea
                className="w-3/4 p-2 bg-gray-800 text-white border border-gray-700 rounded"
                placeholder="Enter your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <button onClick={handleSubmit} className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded">
                Encrypt & Share
            </button>

            {messageId && (
                <div className="mt-4 p-3 bg-gray-900 border border-gray-700 rounded">
                    <p>🔗 Share this link:</p>
                    <code className="break-words">{`https://your-app.vercel.app/retrieve/${messageId}`}</code>
                    <QRCode value={`https://your-app.vercel.app/retrieve/${messageId}`} className="mt-2" />
                </div>
            )}

            {error && <p className="text-red-500 mt-3">{error}</p>}
        </div>
    );
}
