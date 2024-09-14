import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import Sidebar from "../component/Sidebar";
import ChatArea from "../component/ChatArea";
import UserProfile from "../component/UserProfile";
const ConversationPage = () => {
  const [conversations, setConversations] = useState([]);
  const [error, setError] = useState(null);
  const { userId, chatRoomId } = useParams();
  const navigate = useNavigate();
  console.log(userId)
  console.log(chatRoomId)
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await axios.get(`http://localhost:3020/api/v1/users/chatroom/${userId}`);
        console.log(response.data);
        setConversations(response.data);
      } catch (err) {
        setError("Failed to load conversations");
      }
    };

    fetchConversations();
  }, [userId]);

  const handleConversationSelect = (chatRoomId) => {
    navigate(`/chat/${userId}/${chatRoomId}`);
  };
  // const handleReceiverProfile
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-white">
      <div className="flex flex-row flex-grow overflow-hidden mt-[4rem]">
        <Sidebar 
          conversations={conversations}
          onSelectConversation={handleConversationSelect}
          className="flex-none w-[20%] h-full overflow-hidden" 
        />
        <ChatArea 
          chatRoomId={chatRoomId}
          className="flex-grow h-full overflow-hidden" 
        />
        <UserProfile 
        chatRoomId={chatRoomId}
        className="flex-none w-[26%] h-full overflow-hidden" />

      </div>
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
};

export default ConversationPage;




// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Outlet, useParams } from "react-router-dom";
// import Sidebar from "../component/Sidebar";
// import ChatArea from "../component/ChatArea";

// const userId = localStorage.getItem("skyn_userId"); 

// const ConversationPage = () => {
//   const [conversations, setConversations] = useState([]);
//   const [error, setError] = useState(null);
//   const { userId } = useParams();  // Get the chatRoomId from URL params
  
//   useEffect(() => {
//     const fetchConversations = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3020/api/v1/users/chatroom/${userId}`);
//         setConversations(response.data);
//       } catch (err) {
//         setError("Failed to load conversations");
//       }
//     };
//     fetchConversations();
//   }, []);

//   const messageObjects = conversations.flatMap(chatRoom => chatRoom.messages);
//   // console.log(chatRoomId)
//   return (
//     <div className="flex flex-col h-screen overflow-hidden bg-white">
//       <div className="flex flex-row flex-grow overflow-hidden mt-[4rem]">
//         {/* Sidebar remains persistent */}
//         <Sidebar conversations={messageObjects} className="flex-none w-[20%] h-full overflow-hidden" />
//         {/* ChatArea only loads if chatRoomId is present in URL */}
//         {chatRoomId && <ChatArea className="flex-grow h-full overflow-hidden" />}
//       </div>
//       {error && <div className="text-red-500">{error}</div>}
//     </div>
//   );
// };

// export default ConversationPage;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Sidebar from "../component/Sidebar";
// import ChatArea from "../component/ChatArea";
// import UserProfile from "../component/UserProfile";

// const userId = "d742e375-3c6f-4453-9724-e8b41250fc25"; // Set your userId dynamically

// const ConversationPage = () => {
//   const [conversations, setConversations] = useState([]);
//   const [error, setError] = useState(null);
//   const [activeChatRoomId, setActiveChatRoomId] = useState(null);
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     const fetchConversations = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3020/api/v1/users/chatroom/${userId}`);

//         console.log(response.data);
//         // console.log(localStorage.getItem("skyn_userId"))
//         setConversations(response.data); // Make sure this matches your API response structure
//         //console.log(conversations);
        
//       } catch (err) {
//         setError("Failed to load conversations");
//       }
//     };

//     fetchConversations();
//   }, []);

//   useEffect(() => {
//     console.log("Updated conversations:", conversations);
//   }, [conversations]);



//   // console.log(conversations);
//   const messageObjects = conversations.flatMap(chatRoom => chatRoom.messages);
//   console.log(messageObjects);
  
//   return (
//     <div className="flex flex-col h-screen overflow-hidden bg-white">
//       <div className="flex flex-row flex-grow overflow-hidden mt-[4rem]">
//         <Sidebar 
//           conversations={messageObjects} 
//           // error={error} 
//           // onConversationClick={fetchMessages} // Call fetchMessages when a conversation is clicked
//           className="flex-none w-[20%] h-full overflow-hidden" 
//         />
//         <ChatArea 
          
//           className="flex-grow h-full overflow-hidden" 
//         />
//         {/* <UserProfile className="flex-none w-[26%] h-full overflow-hidden" /> */}
//       </div>
//       {error && <div className="text-red-500">{error}</div>}
//     </div>
//   );
// };

// export default ConversationPage;
