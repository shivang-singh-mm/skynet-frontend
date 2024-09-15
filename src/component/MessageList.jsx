// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import MessageItem from "./MessageItem";

// const MessageList = (props) => {


 
//   const messages = props.messages

//   // if (loading) {
//   //   return <div>Loading messages...</div>;
//   // }

//   // if (error) {
//   //   return <div>Error: {error}</div>;
//   // }
//   console.log(messages)
//   return (
//     <div className="flex-grow flex flex-col px-4 py-6 pb-32 max-w-full w-full overflow-auto">
//       {messages.length > 0 ? (
//         messages.map(prop => (
//           <MessageItem 
//             key={prop.id}
//             fromId={prop.fromId}
//             toId={prop.toId}
//             seen={prop.seen}
//             content={prop.content}
//             timeStamp={prop.timeStamp} />
//         ))
//       ) : (
//         <div>No  found</div>
//       )}
//     </div>
//   );
// };

// export default MessageList;
// import { useState } from "react";
// import React from "react";
// import MessageItem from "./MessageItem";

// const MessageList = (props) => {
//   const messages = props.messages;
//   const user = localStorage.getItem("skyn_userId");
//   // const [userMessages, setUserMessage] = useState([])
//   const [latestmessageTime , setLatestmessageTime] = useState("")
//   console.log(messages)
//   const userMessages = messages.filter(message => message.fromId === user)
//   userMessages.sort((a, b) => new Date(b.timeStamp) - new Date(a.timeStamp));
//   setLatestmessageTime(userMessages[0].timeStamp)
//   // setLatestmessageTime(userMessages[0].timeStamp)
//    console.log(userMessages)
//    console.log(latestmessageTime)
//   // Determine if the latest message was sent by the user
//   // const isLatestMessageSentByUser = latestMessageIndex >= 0 && messages[latestMessageIndex].fromId === user;

//   return (
//     <div className="flex-grow flex flex-col px-4 py-6 pb-32 max-w-full w-full overflow-auto">
//       {messages.length > 0 ? (
//         messages.map((message, index) => (
//           <MessageItem 
//             key={message.id}
//             fromId={message.fromId}
//             toId={message.toId}
//             seen={message.seen}
//             content={message.content}
//             timeStamp={message.timeStamp}
//             isSentByUser={message.fromId === user}

//             // isLatestMessageSentByUser={isLatestMessageSentByUser && index === latestMessageIndex}
//             latestmessageTime = {latestmessageTime}
//           />
//         ))
//       ) : (
//         <div></div>
//       )}
//     </div>
//   );
// };

// export default MessageList;
// import { useState, useEffect } from "react";
// import React from "react";
// import MessageItem from "./MessageItem";
// import { io } from 'socket.io-client';

// const socket = io('http://localhost:3020'); // Connect to the Socket.IO server

// const MessageList = (props) => {
//   console.log("prop.messages", props.messages); ///works
//   const [messages, setMessages] = useState([]);
//   const [latestMessageTime, setLatestMessageTime] = useState('');
//   const user = localStorage.getItem("skyn_userId");
//   console.log("log top", messages);// empty arraY...fix this gpt

//   useEffect(() => {
//     setMessages(props.messages);
//   }, [props.messages]);

//   useEffect(() => {
//     // Listen for incoming messages from the Socket.IO server
//     socket.on('receive-msg', (data) => {
//       alert(`Received new message: ${data.content}`);
//       setMessages((prevMessages) => [...prevMessages, data]);
//     });
//     return () => {
//       socket.off('receive-msg');
//     };
//   }, []);
//   console.log("log after useEffect", messages);
//   useEffect(() => {
//     if (messages.length > 0) {
//       // Filter messages sent by the current user
//       const userMessages = messages.filter((message) => message.fromId === user);

//       // Sort messages to get the latest one
//       userMessages.sort((a, b) => new Date(b.timeStamp) - new Date(a.timeStamp));

//       // If there are any messages from the user, set the latest message time
//       if (userMessages.length > 0) {
//         setLatestMessageTime(userMessages[0].timeStamp);
//       }

//     }
//   }, [messages, user]);

//   // Console logs to debug
//   console.log("All messages:", messages);
//   console.log("Latest message time from user:", latestMessageTime);

//   return (
//     <div className="flex-grow flex flex-col px-4 py-6 pb-32 max-w-full w-full overflow-auto">
//       {messages.length > 0 ? (
//         messages.map((message) => (
//           <MessageItem 
//             key={message.id}
//             fromId={message.fromId}
//             toId={message.toId}
//             seen={message.seen}
//             content={message.content}
//             timeStamp={message.timeStamp}
//             isSentByUser={message.fromId === user}
//             latestmessageTime={latestMessageTime}
//           />
//         ))
//       ) : (
//         <div>No messages</div>
//       )}
//     </div>
//   );
// };

// export default MessageList;
// import { useState, useEffect } from "react";
// import React from "react";
// import MessageItem from "./MessageItem";
// import { io } from 'socket.io-client';

// const socket = io('http://localhost:3020'); // Connect to the Socket.IO server

// const MessageList = (props) => {
//   const [messages, setMessages] = useState([]);
//   const [latestMessageTime, setLatestMessageTime] = useState('');
//   const user = localStorage.getItem("skyn_userId");

//   useEffect(() => {
//     // Update messages from props
    
//     setMessages(props.messages);
//     const idList = messages.map(item => item.id);
//     console.log(messages)
//     console.log(idList)

//     try {
//       // Emit the message to the Socket.IO server
//       socket.emit('read-msgs', {
//         data:idList
//       });
      
//     } catch (error) {
//       console.error('Error sending message:', error);
//     } 
//   }, [props.messages]);

//   useEffect(() => {
//     // Listen for incoming messages from the Socket.IO server
//     socket.on('receive-msg', (data) => {
//       console.log(`Received new message: ${data.content}`);
//       setMessages((prevMessages) => [...prevMessages, data]);
//     });

//     // Clean up socket listener on component unmount
//     return () => {
//       socket.off('receive-msg');
//     };
//   }, []);
//   useEffect(() => {
//     // Listen for sent messages
//     socket.on('send-msg', (data) => {
//       console.log(`Sent new message: ${data.content}`);
//       setMessages((prevMessages) => [...prevMessages, data]);
//     });
//     return () => {
//       socket.off('send-msg');
//     };
//   }, []);
//   useEffect(() => {
//     if (messages.length > 0) {
//       // Filter messages sent by the current user
//       const userMessages = messages.filter((message) => message.fromId === user);

//       // Sort messages to get the latest one
//       userMessages.sort((a, b) => new Date(b.timeStamp) - new Date(a.timeStamp));

//       // If there are any messages from the user, set the latest message time
//       if (userMessages.length > 0) {
//         setLatestMessageTime(userMessages[0].timeStamp);
//       }
//     }
//   }, [messages, user]);

//   return (
//     <div className="flex-grow flex flex-col px-4 py-6 pb-32 max-w-full w-full overflow-auto">
//       {messages.length > 0 ? (
//         messages.map((message) => (
//           <MessageItem 
//             key={message.id}
//             fromId={message.fromId}
//             toId={message.toId}
//             seen={message.seen}
//             content={message.content}
//             timeStamp={message.timeStamp}
//             isSentByUser={message.fromId === user}
//             latestmessageTime={latestMessageTime}
//           />
//         ))
//       ) : (
//         <div>No messages</div>
//       )}
//     </div>
//   );
// };

// export default MessageList;
import { useState, useEffect, useRef } from "react";
import React from "react";
import MessageItem from "./MessageItem";
import { io } from 'socket.io-client';

const socket = io('http://localhost:3020'); // Connect to the Socket.IO server

const MessageList = (props) => {
  const [messages, setMessages] = useState([]);
  const [latestMessageTime, setLatestMessageTime] = useState('');
  const user = localStorage.getItem("skyn_userId");
  const messagesEndRef = useRef(null); // Ref for scrolling to the bottom

  useEffect(() => {
    // Update messages from props
    const sortedMessages = [...props.messages].sort((a, b) => new Date(a.timeStamp) - new Date(b.timeStamp));
    setMessages(sortedMessages);

    // Emit the message to the Socket.IO server
    const idList = sortedMessages.map(item => item.id);
    console.log(sortedMessages);
    console.log(idList);

    try {
      socket.emit('read-msgs', { data: idList });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }, [props.messages]);

  useEffect(() => {
    // Listen for incoming messages from the Socket.IO server
    socket.on('receive-msg', (data) => {
      console.log(`Received new message: ${data.content}`);
      setMessages((prevMessages) => {
        // Add new message and sort
        const updatedMessages = [...prevMessages, data].sort((a, b) => new Date(a.timeStamp) - new Date(b.timeStamp));
        return updatedMessages;
      });
    });

    // Clean up socket listener on component unmount
    return () => {
      socket.off('receive-msg');
    };
  }, []);

  useEffect(() => {
    // Listen for sent messages
    socket.on('send-msg', (data) => {
      console.log(`Sent new message: ${data.content}`);
      setMessages((prevMessages) => {
        // Add new message and sort
        const updatedMessages = [...prevMessages, data].sort((a, b) => new Date(a.timeStamp) - new Date(b.timeStamp));
        return updatedMessages;
      });
    });

    return () => {
      socket.off('send-msg');
    };
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      // Filter messages sent by the current user
      const userMessages = messages.filter((message) => message.fromId === user);

      // Sort messages to get the latest one
      userMessages.sort((a, b) => new Date(b.timeStamp) - new Date(a.timeStamp));

      // If there are any messages from the user, set the latest message time
      if (userMessages.length > 0) {
        setLatestMessageTime(userMessages[0].timeStamp);
      }
    }

    // Scroll to the bottom of the messages container
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, user]);

  return (
    <div className="flex-grow flex flex-col px-3 py-3 pb-1 max-w-full w-full overflow-auto">
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
        <div>No messages</div>
      )}
      <div ref={messagesEndRef} /> {/* Empty div to serve as a scroll target */}
    </div>
  );
};

export default MessageList;
