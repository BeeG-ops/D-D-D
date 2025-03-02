const API_BASE_URL = "https://your-backend-url.vercel.app";

// 🔐 Send Encrypted Message to Backend
export async function storeMessage(encryptedData, hmacSignature) {
    const response = await fetch(`${API_BASE_URL}/store`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ encrypted_data: encryptedData, hmac_signature: hmacSignature }),
    });

    if (!response.ok) throw new Error("Failed to store message");
    return await response.json();
}

// 📩 Retrieve & Decrypt Message
export async function retrieveMessage(messageId) {
    const response = await fetch(`${API_BASE_URL}/retrieve/${messageId}`);
    if (!response.ok) throw new Error("Message not found or expired");
    return await response.json();
}
