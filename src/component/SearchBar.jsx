import React, { useState } from "react";

const SearchBar = ({ onGlobalSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onGlobalSearch(value); // Pass search term to parent component for global filtering
  };

  return (
    <div className="flex flex-auto gap-10 items-center pr-4 pl-1 my-auto bg-gray-100 min-h-[61px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
      <div className="flex gap-2 items-center self-stretch my-auto w-12">
        <div className="flex flex-col justify-center items-center self-stretch my-auto w-12 min-h-[48px]">
          <div className="flex overflow-hidden gap-2.5 justify-center items-center w-full max-w-[40px] rounded-[100px]">
            <div className="flex gap-2.5 justify-center items-center self-stretch p-2 my-auto w-10">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/386207518883442a607ffd5068af0d6571abcc6654e219af2e8d84919581a2c5"
                alt="Search icon"
                className="object-contain self-stretch my-auto w-6 aspect-square"
              />
            </div>
          </div>
        </div>
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search"
        aria-label="Search"
        className="flex-1 bg-transparent border-none outline-none"
      />
    </div>
  );
};

export default SearchBar;
