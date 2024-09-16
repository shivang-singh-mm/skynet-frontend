import React, { useEffect, useState, useRef } from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io('http://localhost:3020'); // Socket connection

const ChatArea = () => {
  const { chatRoomId } = useParams(); // Get chatRoomId from URL params
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [receiverName, setReceiverName] = useState("");
  const [receiverId, setReceiverId] = useState("");
  const user = localStorage.getItem("skyn_userId");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3020/api/v1/users/msgs/${chatRoomId}?page=1`
        );
        setMessages(response.data); // Update messages
      } catch (err) {
        setError("Failed to load messages");
      }
    };

    if (chatRoomId) {
      fetchMessages();
    }
  }, [chatRoomId]);

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
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off('receive-msg');
      markReceiverMessagesAsSeen();  // Mark messages as seen when socket connection is off/disconnected
    };
  }, []);

  const markReceiverMessagesAsSeen = () => {
    // Filter unseen messages from the receiver
    const unseenReceiverMessages = messages.filter(
      (msg) => msg.fromId === receiverId && !msg.seen
    );

    if (unseenReceiverMessages.length > 0) {
      const unseenIds = unseenReceiverMessages.map(msg => msg.id);

      // Emit event to mark these messages as seen
      socket.emit('read-msgs', { data: unseenIds });

      // Optionally, update the state to reflect that these messages are seen
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

    // Emit message to socket
    socket.emit('send-msg', { from, to, content: messageContent });

    // Optimistically update the messages list
    const newMessage = {
      fromId: from,
      toId: to,
      content: messageContent,
      timeStamp: new Date().toISOString(),
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    // After sending a message, mark unseen messages from receiver as seen
    markReceiverMessagesAsSeen();
  };

  return (
    <main className="relative flex flex-col w-[100%] h-screen max-md:ml-0 max-md:w-full">
      <div className="flex flex-col w-full h-full">
        {/* Header with receiver's name */}
        <div className="bg-zinc-100 border-b border-gray-300 p-4 mt-[4rem]">
          <h2 className="text-lg font-bold">
            <Link to={`/profile/${receiverId}`}>{receiverName}</Link>
          </h2>
        </div>

        {/* Message list is scrollable and takes full width */}
        <div className="flex-grow overflow-y-auto bg-neutral-100 bg-opacity-70">
          <MessageList messages={messages} />
        </div>

        {/* Message input is fixed at the bottom */}
        <div className="sticky bottom-0 w-full bg-zinc-100 border-t border-gray-300">
          <MessageInput onSendMessage={handleSendMessage} />
        </div>
      </div>

      {error && <div className="text-red-500">{error}</div>}
    </main>
  );
};

export default ChatArea;
