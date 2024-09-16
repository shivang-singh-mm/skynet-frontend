import React, { useState, useEffect, useRef } from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io('http://localhost:3020'); // Socket connection

const ChatArea = () => {
  const { chatRoomId } = useParams(); 
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [receiverName, setReceiverName] = useState("");
  const [receiverId, setReceiverId] = useState("");
  const [page, setPage] = useState(1); // State for pagination
  const [hasMoreMessages, setHasMoreMessages] = useState(true); // Flag to check if more messages are available
  const user = localStorage.getItem("skyn_userId");
  const messageListRef = useRef(null); // Ref for the message list container

  useEffect(() => {
    const fetchMessages = async (pageNum) => {
      try {
        const response = await axios.get(
          `http://localhost:3020/api/v1/users/msgs/${chatRoomId}?page=${pageNum}`
        );
        if (response.data.length > 0) {
          setMessages((prevMessages) => [...response.data, ...prevMessages]);
          setPage(pageNum);
        } else {
          setHasMoreMessages(false); // No more messages to load
        }
      } catch (err) {
        setError("Failed to load messages");
      }
    };

    if (chatRoomId) {
      fetchMessages(page);
    }
  }, [chatRoomId, page]);

  useEffect(() => {
    if (messages.length > 0) {
      const firstMessage = messages[0];
      setReceiverName(firstMessage.from.userId === user ? firstMessage.to.name : firstMessage.from.name);
      setReceiverId(firstMessage.from.userId === user ? firstMessage.to.userId : firstMessage.from.userId);
    }
  }, [messages]);

  useEffect(() => {
    // Listen for incoming messages
    socket.on('receive-msg', (data) => {
      setMessages((prevMessages) => [data, ...prevMessages]);
    });

    return () => {
      socket.off('receive-msg');
      markReceiverMessagesAsSeen();  // Mark messages as seen when socket connection is off/disconnected
    };
  }, []);

  const markReceiverMessagesAsSeen = () => {
    const unseenReceiverMessages = messages.filter(
      (msg) => msg.fromId === receiverId && !msg.seen
    );

    if (unseenReceiverMessages.length > 0) {
      const unseenIds = unseenReceiverMessages.map(msg => msg.id);

      socket.emit('read-msgs', { data: unseenIds });

      setMessages(prevMessages =>
        prevMessages.map(msg =>
          unseenIds.includes(msg.id) ? { ...msg, seen: true } : msg
        )
      );
    }
  };

  const handleSendMessage = (messageContent) => {
    const from = localStorage.getItem('skyn_userId');
    const to = receiverId;

    if (!from || !to) {
      console.error("Sender or receiver ID is missing");
      return;
    }

    socket.emit('send-msg', { from, to, content: messageContent });

    const newMessage = {
      fromId: from,
      toId: to,
      content: messageContent,
      timeStamp: new Date().toISOString(),
    };
    setMessages((prevMessages) => [newMessage, ...prevMessages]);

    markReceiverMessagesAsSeen();
  };

  // Sort messages by timestamp before passing to MessageList
  const sortedMessages = messages.slice().sort((a, b) => new Date(a.timeStamp) - new Date(b.timeStamp));

  // Handle scrolling to the top for loading more messages
  const handleScroll = () => {
    if (messageListRef.current.scrollTop === 0 && hasMoreMessages) {
      setPage((prevPage) => prevPage + 1); // Increment the page number to load more messages
    }
  };

  return (
    <main className="relative flex flex-col w-[100%] h-screen max-md:ml-0 max-md:w-full">
      <div className="flex flex-col w-full h-full">
        <div className="bg-zinc-100 border-b border-gray-300 p-4 mt-[4rem]">
          <h2 className="text-lg font-bold">
            <Link to={`/profile/${receiverId}`}>{receiverName}</Link>
          </h2>
        </div>
        <div
          className="flex-grow overflow-y-auto bg-neutral-100 bg-opacity-70"
          onScroll={handleScroll}
          ref={messageListRef}
        >
          <MessageList messages={sortedMessages} />
        </div>
        <div className="sticky bottom-0 w-full bg-zinc-100 border-t border-gray-300">
          <MessageInput onSendMessage={handleSendMessage} />
        </div>
      </div>

      {error && <div className="text-red-500">{error}</div>}
    </main>
  );
};

export default ChatArea;
