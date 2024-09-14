// import React, { useEffect } from "react";
// import MessageList from "./MessageList";
// import MessageInput from "./MessageInput";
// import { useParams } from 'react-router-dom';

// const ChatArea = (props) => {
//   const {userId, chatRoomId } = useParams();
//   const [messages, setMessages] = React.useState([]);
  
//   console.log(chatRoomId)
//   useEffect(() => {
//     if(chatRoomId){
//       const fetchMessages = async () => {
//         try {
//           const response = await axios.get(`http://localhost:3020/api/v1/users/msgs/${chatRoomId}?page=1`);
//           setMessages(response.data); // Set the messages
//           console.log(messages);
//           // setActiveChatRoomId(chatRoomId); // Track active chatRoomId
//         } catch (err) {
//           setError("Failed to load messages");
//         }
//         fetchMessages()
//       };
//     }
    
//   } , [props.chatRoomId])
//   console.log(messages);
  


//   return (
//     <main className="relative flex flex-col ml-5 w-[46%] h-screen max-md:ml-0 max-md:w-full">
//       <div className="flex flex-col w-full  h-full">
//         hiiiiiiiiiiiiii
//         {/* Message list is scrollable and takes full width */}
//         <div className="flex-grow overflow-y-auto bg-neutral-100 bg-opacity-70 ">
//           <MessageList />
//         </div>
//         {/* Message input is fixed at the bottom */}
//         <div className="sticky bottom-0 w-full bg-zinc-100 border-t border-gray-300">
//           <MessageInput />
//         </div>
//       </div>
//     </main>
//   );
// };

// export default ChatArea;

import React, { useEffect, useState } from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { useParams } from "react-router-dom";
import axios from "axios";

const ChatArea = () => {
  const { chatRoomId } = useParams(); // Get chatRoomId from URL params
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  console.log(chatRoomId); // To check if chatRoomId is correctly captured

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:3020/api/v1/users/msgs/${chatRoomId}?page=1`);
        setMessages(response.data); // Update messages
        console.log("Fetched messages:", response.data); // Log messages after fetching
      } catch (err) {
        setError("Failed to load messages");
        console.error(err);
      }
    };

    if (chatRoomId) {
      fetchMessages(); // Call the function to fetch messages when chatRoomId changes
    }
  }, [chatRoomId]); // Dependency array should include chatRoomId

  console.log(messages); // This will log messages after state update

  return (
    <main className="relative flex flex-col ml-5 w-[46%] h-screen max-md:ml-0 max-md:w-full">
      <div className="flex flex-col w-full h-full">
        {/* Message list is scrollable and takes full width */}
        <div className="flex-grow overflow-y-auto bg-neutral-100 bg-opacity-70">
          <MessageList messages={messages} /> {/* Pass fetched messages to MessageList */}
        </div>
        {/* Message input is fixed at the bottom */}
        <div className="sticky bottom-0 w-full bg-zinc-100 border-t border-gray-300">
          <MessageInput />
        </div>
      </div>
      {error && <div className="text-red-500">{error}</div>}
    </main>
  );
};

export default ChatArea;
