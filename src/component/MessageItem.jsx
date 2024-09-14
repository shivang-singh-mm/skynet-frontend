// import React from "react";
// import { Link } from "react-router-dom";

// const MessageItem = (prop) => {
//   const user = localStorage.getItem("skyn_userId");
//   let otherUser = prop.fromId != user ? prop.toId : prop.fromId;

//   return (
//     <div className={`flex ${otherUser ? "flex-row-reverse" : "flex-row"} items-start mb-4`}>
//       <div
//         className={`flex flex-col justify-center px-2 py-3 ${
//           otherUser ? "bg-sky-300" : "bg-sky-200"
//         } rounded-3xl max-w-md ${otherUser ? "ml-2.5" : "mr-2.5"} ${otherUser ? "text-right" : "text-left"}`}
//       >
//         <div className="opacity-[var(--sds-size-stroke-border)] font-normal">{prop.content}</div>
//       </div>
//       <div
//         className={`flex items-end ${
//           otherUser ? "flex-row-reverse" : "flex-row"
//         } text-base md:text-lg lg:text-xl text-neutral-400 mt-2 ${otherUser ? "ml-2.5" : "mr-2.5"}`}
//       >
//         {/* <Link to={`/conversations/${conversationId}`} style={{ fontSize: '50%' }}>{timeStamp}</Link> */}
//       </div>
//     </div>
//   );
// };

// export default MessageItem;

import React from "react";

const MessageItem = (prop) => {
  const sender = localStorage.getItem("skyn_userId");
  const isSentByUser = prop.fromId === sender; // Check if the message is sent by the user
  const timeStamp = prop.timeStamp
  // Function to format timestamp to date and time
  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    hours = hours.toString().padStart(2, '0');
  
    return `${day}-${month} ${hours}:${minutes} ${ampm}`;
  }
  

  return (
    <div className={`flex ${isSentByUser ? "flex-row-reverse" : "flex-row"} items-start mb-4`}>
      <div
        className={`flex flex-col justify-center px-3 py-3 ${
          isSentByUser ? (prop.seen ? "bg-blue-400" : "bg-blue-300") : (prop.seen ? "bg-green-400" : "bg-green-300")
        } rounded-3xl max-w-md ${isSentByUser ? "ml-2.5" : "mr-2.5"} ${isSentByUser ? "text-right" : "text-left"}`}
      >
        <div className="text-black font-normal">{prop.content}</div>

        {/* If message is not seen, show "Unseen" */}
        {!prop.seen && (
          <div className="text-red-500 text-xs mb-1">Unseen</div>
        )}

        {/* Display the timestamp */}
        <div className="text-gray-500 text-xs mt-1">
          {formatTimestamp(prop.timeStamp)}
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
