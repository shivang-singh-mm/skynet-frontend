  // import React, { useEffect, useState } from "react";
  // import MessageList from "./MessageList";
  // import MessageInput from "./MessageInput";
  // import { useParams ,Link, useNavigate} from "react-router-dom";
  // import axios from "axios";


  // const ChatArea = () => {
  //   const { chatRoomId } = useParams(); // Get chatRoomId from URL params
  //   const [messages, setMessages] = useState([]);
  //   const [error, setError] = useState(null);
  //   const [receiverName , setReceiverName] = useState("")
  //   const [receiverId , setReceiverId] = useState("")
  //   console.log(chatRoomId); // To check if chatRoomId is correctly captured

  //   useEffect(() => {
  //     const fetchMessages = async (message) => {
  //       try {
  //         const response = await axios.get(`http://localhost:3020/api/v1/users/msgs/${chatRoomId}?page=1`);
  //         setMessages(response.data); // Update messages
  //         console.log("Fetched messages:", response.data); // Log messages after fetching
  //       } catch (err) {
  //         setError("Failed to load messages");
  //         console.error(err);
  //       }
  //     };
      
  //     if (chatRoomId) {
  //       fetchMessages(); // Call the function to fetch messages when chatRoomId changes
  //     }
  //   }, [chatRoomId]); // Dependency array should include chatRoomId
  //   const user = localStorage.getItem("skyn_userId");
  //   useEffect(() => {
  //     if (messages.length > 0) {
  
  //       setReceiverName(messages[0].from.userId === user ? messages[0].to.name : messages[0].from.name);
  //       setReceiverId(messages[0].from.userId === user ? messages[0].to.userId : messages[0].from.userId);
  //     }
  //   }, [messages]);
  //   console.log(messages); // This will log messages after state update
  //   // const user = localStorage.getItem("skyn_userId");
  //   // setReceiverName(messages[0].from.userId === user ? messages[0].to.name : messages[0].from.name )
  //   console.log("user" , user);
  //   console.log("receievr" , receiverName , receiverId);


  //   return (
  //     <main className="relative flex flex-col w-[100%] h-screen max-md:ml-0 max-md:w-full">
  //   <div className="flex flex-col w-full h-full">
  //     {/* Header with receiver's name */}
  //     <div className="bg-zinc-100 border-b border-gray-300 p-4 mt-[4rem]"> 
  //       <h2 className="text-lg font-bold">
  //         <Link to={`/profile/${receiverId}`}>{receiverName}</Link>
  //       </h2>
  //     </div>

  //     {/* Message list is scrollable and takes full width */}
  //     <div className="flex-grow overflow-y-auto bg-neutral-100 bg-opacity-70">
  //       <MessageList messages={messages} /> {/* Pass fetched messages to MessageList */}
  //     </div>

  //     {/* Message input is fixed at the bottom */}
  //     <div className="sticky bottom-0 w-full bg-zinc-100 border-t border-gray-300">
  //       <MessageInput messages={messages} receiverId={receiverId} chatRoomId={chatRoomId} />
  //     </div>
  //   </div>
    
  //   {error && <div className="text-red-500">{error}</div>}
  // </main>

  //   );
  // };

  // export default ChatArea;
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
      };
    }, []);
  
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
  