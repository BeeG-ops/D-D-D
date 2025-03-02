import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { retrieveMessage } from "../api";
import CryptoJS from "crypto-js";

export default function RetrieveMessage() {
    const router = useRouter();
    const { id } = router.query;
    const [decryptedMessage, setDecryptedMessage] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            retrieveMessage(id)
                .then((data) => {
                    const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY;
                    const bytes = CryptoJS.AES.decrypt(data.encrypted_data, secretKey);
                    setDecryptedMessage(bytes.toString(CryptoJS.enc.Utf8));
                })
                .catch(() => setError("Message expired or deleted."));
        }
    }, [id]);

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
            <h1 className="text-2xl font-bold mb-4">📩 Retrieved Message</h1>
            {decryptedMessage ? (
                <div className="bg-gray-900 p-4 rounded border border-gray-700">
                    <p>{decryptedMessage}</p>
                </div>
            ) : (
                <p className="text-red-500">{error || "Loading..."}</p>
            )}
        </div>
    );
}
