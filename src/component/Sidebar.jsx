import React, { useState } from "react";
import ConversationSearch from "./ConversationSearch";
import ConversationList from "./ConversationList";

const Sidebar = (prop) => {
  
  //  console.log(prop.conversations)
  
  // const convoList = prop.conversations;
  return (
    <aside className="flex flex-col w-[28%] h-screen max-md:ml-0 max-md:w-full">
  <div className="flex flex-col w-full h-full mt-[4rem]">
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
