import React from "react";
import avatar from "../asset/avtar.png";
import { MdOutlineChatBubbleOutline } from "react-icons/md";

const Post = ({ profileImage = { avatar }, Name, Job, Post, Skills }) => {
  return (
    <div className="flex items-center justify-around">
      <button className="flex justify-around items-center md:gap-20 gap-4 lg:gap-28 text-center">
        <div className="flex flex-row gap-2">
          <>naflwiviwrvwsj</>
          <div className='w-[30px] h-[30px] ' style={{ position: 'relative', overflow: 'hidden', borderRadius: '50%' }}>
            <img src={profileImage} alt="profileimage"
              style={{ display: 'inline', margin: 'auto', height: 'auto', width: '100%' }} />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2">
              <h3 className="font-inter font-normal text-base leading-normal text-black">
                {Name}
              </h3>
              <p className="font-inter font-normal text-xs leading-normal text-gray-600">
                {Job}
              </p>
            </div>
            <p className="font-inter font-normal text-xs leading-normal flex items-center text-black">
              {Post}
            </p>
          </div>
        </div>
        <div className="font-inter font-medium text-xs leading-normal  items-center text-black hidden md:flex">
          {Skills}
        </div>
      </button>
      <div className="flex items-center justify-between gap-5">
        <button className="lg:w-[113px] w-[90px] h-12 md:h-16 flex justify-center items-center lg:p-5 p-2 bg-white shadow-md rounded-full">
          Follow
        </button>
        <button className="filter drop-shadow-md">
          <MdOutlineChatBubbleOutline size={32} />
        </button>
      </div>
    </div>
  );
};

export default Post;
