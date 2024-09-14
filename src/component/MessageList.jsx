import React, { useEffect, useState } from "react";
import axios from "axios";
import MessageItem from "./MessageItem";

const MessageList = (props) => {


 
  const messages = props.messages

  // if (loading) {
  //   return <div>Loading messages...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }
  console.log(messages)
  return (
    <div className="flex-grow flex flex-col px-4 py-6 pb-32 max-w-full w-full overflow-auto">
      {messages.length > 0 ? (
        messages.map(prop => (
          <MessageItem 
            key={prop.id}
            fromId={prop.fromId}
            toId={prop.toId}
            seen={prop.seen}
            content={prop.content}
            timeStamp={prop.timeStamp} />
        ))
      ) : (
        <div>No  found</div>
      )}
    </div>
  );
};

export default MessageList;
