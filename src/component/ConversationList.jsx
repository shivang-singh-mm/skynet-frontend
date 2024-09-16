import React, { useState } from "react";
import ConversationItem from "./ConversationItem";

const ConversationList = (prop) => {
  const [selectedConversationId, setSelectedConversationId] = useState(null);
  const user = localStorage.getItem("skyn_userId");

  if (!prop.conversation || prop.conversation.length === 0) {
    return <div>No conversations found</div>;
  }

  const handleSelectConversation = (id) => {
    setSelectedConversationId(id); // Update the selected conversation ID
    prop.onSelectConversation(id); // Call the prop function to handle selection
  };

  return (
    <div className="conversation-list overflow-y-auto h-full">
      {prop.conversation.map((item) => {
        let otherUser = item.messages[0].fromId === user ? item.messages[0].to.name : item.messages[0].from.name;
        let recieverId = item.messages[0].fromId === user ? item.messages[0].to.id : item.messages[0].from.id;

        return (
          <div
            key={item.id}
            className={`cursor-pointer ${selectedConversationId === item.id ? 'bg-gray-200' : 'bg-white'}`} 
            onClick={() => handleSelectConversation(item.id, recieverId)}
          >
            <ConversationItem
                
              name={otherUser}
              lastMessage={item.messages[0].content}
              time={item.messages[0].timeStamp}
              chatRoomId={item.messages[0].chatRoomId}
              seen={item.messages[0].seen}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ConversationList;

// import React from "react";
// import ConversationItem from "./ConversationItem";

// const ConversationList = (prop) => {
//   const user = localStorage.getItem("skyn_userId");
//   console.log(prop.conversation)
//   if (!prop.conversation || prop.conversation.length === 0) {
//     return <div>No conversations found</div>;
//   }
//   // const messageObjects = prop.flatMap(chatRoom => chatRoom.messages);
//   // console.log(messageObjects)
//   return (
//     <div className="conversation-list overflow-y-auto h-full">
//       {prop.conversation.map((item) => {
//         let otherUser = item.messages[0].fromId === user ? item.messages[0].to.name : item.messages[0].from.name;
//         let recieverId = item.messages[0].fromId === user ? item.messages[0].to.id : item.messages[0].from.id;
//         return (
//           <div 
//             key={item.id}
//             onClick={() => {
//               prop.onSelectConversation(item.id)
//               prop.onReceiverProfile(recieverId)
//               }
//             }
//           >
//             <ConversationItem
//               name={otherUser}
//               lastMessage={item.messages[0].content}
//               time={item.messages[0].timeStamp}
//               chatRoomId={item.messages[0].chatRoomId}
//               seen={item.messages[0].seen}
//             />
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default ConversationList;
// import React, { useEffect } from "react";

// // const [activeChatRoomId, setActiveChatRoomId] = useState(null);
// import ConversationItem from "./ConversationItem";
// import axios from "axios";
// import { Link } from "react-router-dom";


// const ConversationList = (props) => {
//   // Retrieve the userId from localStorage
//   const user = localStorage.getItem("skyn_userId");

//   // const [messages, setMessages] = React.useState([]);
  

//   // useEffect(() => {
//   //   const fetchMessages = async () => {
//   //     try {
//   //       const response = await axios.get(`http://localhost:3020/api/v1/users/msgs/${chatRoomId}?page=1`);
//   //       setMessages(response.data); // Set the messages
//   //       // setActiveChatRoomId(chatRoomId); // Track active chatRoomId
//   //     } catch (err) {
//   //       setError("Failed to load messages");
//   //     }
//   //     fetchMessages()
//   //   };
//   // } , [])
//   if (!props.conversations || props.conversations.length === 0) {
//     return <div>No conversations found</div>;
//   }

//   // if (props.error) {
//   //   return <div className="text-red-500">{props.error}</div>;
//   // }
  
//   const convolist = props.conversation
//   // console.log(convolist);
//   // console.log(messages);
  
//   // Check if props is an array and has length
//   return (
//     <div className="conversation-list overflow-y-auto h-full">
//       {convolist.length > 0 ? (
//         convolist.map((prop) => {
//           // Determine the other user
          
//           let otherUser = prop.fromId === user ? prop.to.name : prop.from.name;
         
//           // Return the ConversationItem
//           return (
//             <div key={prop.id}>
//             <Link
//               to={`/chat/${prop.chatRoomId}`}>
//               <ConversationItem
              
//               name={otherUser} // Use the determined participant's name
//               lastMessage={prop.content}
//               time={prop.timeStamp}
//               chatRoomId={prop.chatRoomId}
//               seen={prop.seen}
//               // onClick={prop.id}
//             />
//             </Link>
            
//             </div>
           
//           );
//         })
//       ) : (
//         <div>No conversations found</div>
//       )}
//     </div>
//   );
// };

// export default ConversationList;


