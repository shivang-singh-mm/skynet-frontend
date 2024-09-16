
import React, { useState, useEffect, useRef } from "react";
import MessageItem from "./MessageItem";

const MessageList = ({ messages, onLoadMoreMessages, hasMoreMessages }) => {
  const [latestMessageTime, setLatestMessageTime] = useState("");
  const user = localStorage.getItem("skyn_userId");
  const messagesEndRef = useRef(null); // Ref for scrolling to the bottom
  const messageListRef = useRef(null); // Ref for the message list container

  // Scroll to the bottom when messages are updated
  useEffect(() => {
    if (messages.length > 0) {
      const userMessages = messages.filter((message) => message.fromId === user);
      userMessages.sort((a, b) => new Date(b.timeStamp) - new Date(a.timeStamp));
      if (userMessages.length > 0) {
        setLatestMessageTime(userMessages[0].timeStamp);
      }
    }
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, user]);

  // Handle scrolling to the top for loading more messages
  const handleScroll = () => {
    if (messageListRef.current.scrollTop === 0 && hasMoreMessages) {
      onLoadMoreMessages(); // Trigger loading more messages
    }
  };

  return (
    <div
      className="flex-grow flex flex-col px-3 py-3 pb-1 max-w-full w-full overflow-auto"
      onScroll={handleScroll}
      ref={messageListRef}
    >
      {messages.length > 0 ? (
        messages.map((message) => (
          <MessageItem
            key={message.id}
            fromId={message.fromId}
            toId={message.toId}
            seen={message.seen}
            content={message.content}
            timeStamp={message.timeStamp}
            isSentByUser={message.fromId === user}
            latestmessageTime={latestMessageTime}
          />
        ))
      ) : (
        <div></div>
      )}
      <div ref={messagesEndRef} /> {/* Empty div to serve as a scroll target */}
    </div>
  );
};

export default MessageList;
