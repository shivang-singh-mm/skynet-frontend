
import React, { useState } from "react";

const MessageInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message); // Send the message content via the prop
      setMessage(""); // Clear the input after sending
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center justify-between bg-zinc-100 px-4 py-3 border-t border-gray-300 w-full h-16">
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
