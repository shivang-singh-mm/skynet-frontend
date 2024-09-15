import React, { useState } from "react";
import ConversationSearch from "./ConversationSearch";
import ConversationList from "./ConversationList";

const Sidebar = (prop) => {
  // const [searchTerm, setSearchTerm] = useState("");

  // Filter conversations based on the search term
  // const handleSearch = (term) => {
  //   setSearchTerm(term);
  // };
   console.log(prop.conversations)
  
  // const messageObjects = prop.flatMap(chatRoom => chatRoom.messages);
  const convoList = prop.conversations;
  return (
    <aside className="flex flex-col w-[28%] h-screen max-md:ml-0 max-md:w-full">
  <div className="flex flex-col w-full h-full mt-[4rem]"> {/* Applied margin here to account for navbar */}
    <div className="flex flex-col px-0 w-full leading-none max-md:px-5">
      {/* Pass search handler to ConversationSearch */}
      {/* <ConversationSearch onSearch={handleSearch} /> */}
      {/* Pass searchTerm to ConversationList for filtering */}
      <ConversationList 
        conversation={prop.conversations} 
        onReceiverProfile={prop.onReceiverProfile}
        onSelectConversation={prop.onSelectConversation}
      />
    </div>
  </div>
</aside>

  );
};

export default Sidebar;
