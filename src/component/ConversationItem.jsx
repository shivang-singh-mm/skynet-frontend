import React from "react";

import MessageList from "./MessageList";
import ChatArea from "./ChatArea";

const ConversationItem = (props) => {
  
  const chatRoomId = props.chatRoomId
 
  // console.log(chatRoomId);
  
  return (
    <div
      className="block w-full hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
    >
      <div className="flex items-center justify-between p-3 w-full">
        <div className="flex items-center flex-1">
          <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-baseline">
              <h3 className="text-sm font-medium text-gray-900 truncate">{props.name}</h3>
              <span className="text-xs text-gray-500">{props.timeStamp}</span>
            </div>
            <p className="text-xs text-gray-600 mt-1 truncate">
              {props.content}
            </p>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationItem;
