import React from "react";
// import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import Message from "./Message";
// import axios from "axios";
import MessageList from "./MessageList";
import ChatArea from "./ChatArea";

const ConversationItem = (props) => {
  // const [messages, setMessages] = React.useState([]);
  const chatRoomId = props.chatRoomId
  // const fetchMessages = async () => {
  //   try {
  //     const response = await axios.get(`http://localhost:3020/api/v1/users/msgs/${props.chatRoomId}?page=1`);
  //     setMessages(response.data); // Set the messages
  //     // setActiveChatRoomId(chatRoomId); // Track active chatRoomId
  //   } catch (err) {
  //     setError("Failed to load messages");
  //   }
  // };
  console.log(chatRoomId);
  
  return (
    <div
      className="block w-full hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
      // onClick=<ChatArea chatRoomId={chatRoomId}/> // modify this line of code
    >
      <div className="flex items-center justify-between p-3 w-full">
        <div className="flex items-center flex-1">
          {/* Grey Circle instead of Avatar */}
          <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-baseline">
              <h3 className="text-sm font-medium text-gray-900 truncate">{props.name}</h3>
              <span className="text-xs text-gray-500">{props.timeStamp}</span>
            </div>
            <p className="text-xs text-gray-600 mt-1 truncate">
              {props.content}
            </p>
            {/* Commented out newMessages section */}
            {/* {newMessages > 0 && (
              <p className="text-xs text-red-500 mt-1">
                +{newMessages} new message{newMessages > 1 ? "s" : ""}
              </p>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationItem;
