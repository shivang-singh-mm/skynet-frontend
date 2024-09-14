import React, { useState } from "react";

const ConversationSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term); // Update local state
    onSearch(term); // Call the handler to update the conversation list
  };

  return (
    <div className="flex flex-col justify-center p-2.5 w-full font-medium text-gray-600 text-sm md:text-base lg:text-lg">
      <div className="flex overflow-hidden gap-2 items-center px-4 py-4 w-full bg-white rounded-full border border-solid border-zinc-300 min-h-[49px] shadow-md">
        <input
          type="text"
          placeholder="Search conversations"
          className="flex-1 shrink self-stretch my-auto basis-0 opacity-50 bg-transparent border-none outline-none md:w-3/4 lg:w-2/3"
          aria-label="Search conversations"
          value={searchTerm}
          onChange={handleInputChange} // Capture input change
        />
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/e7a50921e635a0f570172a7327c6a9ade56e66c315a5ecbd3cd4bbc1a5e87b31?placeholderIfAbsent=true&apiKey=be7bb19bd9a34f629f0b93471561a4e2"
          alt="Search icon"
          className="object-contain shrink-0 self-stretch my-auto w-4 md:w-6 lg:w-8 aspect-square"
        />
      </div>
    </div>
  );
};

export default ConversationSearch;
