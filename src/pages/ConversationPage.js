import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from "axios";
import Sidebar from "../component/Sidebar";
import ChatArea from "../component/ChatArea";


const ConversationPage = () => {

  const [conversations, setConversations] = useState([]);
  const [users, setUsers] = useState([]);
  const [receiverId , setReceiverId] = useState([]);

  const [error, setError] = useState(null);
  const { userId, chatRoomId } = useParams();
  const navigate = useNavigate();
  // console.log(userId)
  // console.log(chatRoomId)
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await axios.get(`http://localhost:3020/api/v1/users/chatroom/${userId}`);
        // console.log(response.data);
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
  const handleReceiverProfile = (receiverId) => {
      setReceiverId(receiverId)
      return receiverId;
  };

  
  return (
    <div className="flex flex-col w-screen h-screen overflow-hidden bg-white"> 
    <div className="h-[4rem] bg-gray-800"> 
    </div>  
    <div className="flex flex-grow overflow-hidden">
    
      <Sidebar 
        conversations={conversations}
        onSelectConversation={handleConversationSelect}
        onReceiverProfile={handleReceiverProfile}
        className="w-[30%] h-full overflow-y-auto"
      />    
      <ChatArea 
        chatRoomId={chatRoomId}
        className="relative flex flex-col ml-5 w-[70%] h-full max-md:ml-0 max-md:w-full overflow-y-auto" // ChatArea is scrollable
      />      
    </div>
    {error && <div className="text-red-500">{error}</div>}
  </div>
  );
};

export default ConversationPage;




