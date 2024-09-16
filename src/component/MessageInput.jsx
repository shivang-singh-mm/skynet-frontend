// import React, { useState } from "react";
// import axios from "axios"; // Make sure axios is imported
// import { io } from 'socket.io-client';

// const socket = io('http://localhost:3020');

// const MessageInput = (prop) => {
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [messageList, setMessageList] = useState([]);

//   const sendMessage = async (e) => {
//     e.preventDefault();

//     if (message.trim() === '') {
//       console.error("Message cannot be empty");
//       return;
//     }

//     const from = localStorage.getItem('skyn_userId');
//     const to = prop.receiverId;

//     if (!from || !to) {
//       console.error("Sender or receiver ID is missing");
//       return;
//     }

//     setLoading(true);

//     try {
//       // Emit the message to the Socket.IO server
//       socket.emit('send-msg', {
//         from,
//         to,
//         content: message,
//       });
//       setMessageList(...messageList , )
//       setMessage('');
//     } catch (error) {
//       console.error('Error sending message:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={sendMessage} className="flex items-center justify-between bg-zinc-100 px-4 py-3 border-t border-gray-300 w-full h-16">
//       <img
//         src="https://cdn.builder.io/api/v1/image/assets/TEMP/cc875e7058158725c838711fc29a8f463b6ed2dcdc19c96a94d5b81ddce42046"
//         alt="Attachment icon"
//         className="w-8 h-8"
//       />
//       <input
//         type="text"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         placeholder="Type a message"
//         aria-label="Type a message"
//         className="flex-grow mx-4 px-4 py-2 bg-white border border-gray-300 rounded-full focus:outline-none"
//       />
//       <button type="submit" aria-label="Send message">
//         <img
//           src="https://cdn.builder.io/api/v1/image/assets/TEMP/98a988e0ce948a98a67c9104af04991cc0e4b3d05ce1c7666b3325ae910c17ea"
//           alt="Send icon"
//           className="w-8 h-8"
//         />
//       </button>
//     </form>
//   );
// };

// export default MessageInput;
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
