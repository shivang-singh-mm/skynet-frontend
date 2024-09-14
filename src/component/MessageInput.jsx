import React, { useState } from "react";

const MessageInput = ({ userId, senderId }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (message.trim() === "") return;

    // Send the message to the backend
    fetch(`/api/messages/${userId}/${senderId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: message,
        sender: "self", // Assuming 'self' is the sender
        time: new Date().toLocaleTimeString(),
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(() => {
        setMessage(""); // Clear the input field after message is sent
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center justify-between bg-zinc-100 px-4 py-3 border-t border-gray-300 w-full h-16">
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/cc875e7058158725c838711fc29a8f463b6ed2dcdc19c96a94d5b81ddce42046"
        alt="Attachment icon"
        className="w-8 h-8"
      />
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
        aria-label="Type a message"
        className="flex-grow mx-4 px-4 py-2 bg-white border border-gray-300 rounded-full focus:outline-none"
      />
      <button type="submit" aria-label="Send message">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/98a988e0ce948a98a67c9104af04991cc0e4b3d05ce1c7666b3325ae910c17ea"
          alt="Send icon"
          className="w-8 h-8"
        />
      </button>
    </form>
  );
};

export default MessageInput;
