import React from "react";

const MessageItem = ({ seen, content, timeStamp, isSentByUser, latestmessageTime }) => {
  const sender = localStorage.getItem("skyn_userId");
  // const isMessageFromUser = fromId === sender;

  const formatTimestamp = (timestamp) => {
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
  };

  return (
    <div className={`flex ${isSentByUser ? "flex-row-reverse" : "flex-row"} items-start mb-2`}>
      <div
        className={`flex flex-col justify-center px-3 py-2 ${
          isSentByUser ? (seen ? "bg-blue-400" : "bg-blue-300") : (seen ? "bg-green-400" : "bg-green-300")
        } rounded-3xl max-w-md ${isSentByUser ? "ml-2.5" : "mr-2.5"} ${isSentByUser ? "text-right" : "text-left"}`}
      >
        <div className="text-black font-normal">{content}</div>
      </div>

      <div className="flex flex-col ml-2 text-gray-500 text-xs">
        <div>{formatTimestamp(timeStamp)}</div>
        {/* Display the "Unseen" tag only if not sent by the user, the message is unseen, and it is not a previous message when the latest message was sent by the user */}
        {!isSentByUser && !seen &&  timeStamp > latestmessageTime && (
          <div className="text-red-500 text-xs mt-1">
            Unseen
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageItem;
