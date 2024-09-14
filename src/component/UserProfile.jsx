import React from "react";

const UserProfile = (props) => {
  return (
    <aside className="flex flex-col ml-5 w-[26%] max-md:ml-0 max-md:w-full h-full overflow-y-auto"> {/* Overflow for scrolling */}
      <div className="flex flex-col pt-7 pb-3.5 mt-5 w-full bg-white max-md:mt-6 text-sm">
        {/* Profile Section */}
        <div className="flex flex-col items-center self-center py-2 w-[301px] mx-auto">
          <div className="flex items-center justify-center w-[188px] p-2.5">
            <div className="w-[168px]">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/fc9d2a140ef102c4fb90a10699ba6dab73296d158b81d4c23b78db1a4d9b697b"
                alt="Saniya Rana profile picture"
                className="object-contain w-full aspect-square rounded-full shadow-lg"
              />
            </div>
          </div>
          <h2 className="text-center text-xl font-bold mt-2 text-black">
            Saniya Rana
          </h2>
          <p className="text-center mx-auto py-2 text-base text-gray-700">
            Co-founder and CEO of Amazon || Ted-ex Speaker || Grammy Award Winner || Oscar Winner
          </p>
        </div>

        {/* Media Section */}
        <div className="flex flex-col px-2 mt-16 w-full max-md:mt-10">
          <div className="flex justify-between items-center w-full text-lg text-gray-600">
            <h3 className="font-medium">Media</h3>
            <button className="text-blue-600 hover:underline">See all</button>
          </div>

          {/* Media Items */}
          <div className="flex gap-5 items-center mt-2 ml-2.5">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/4a20f4770537e31cd6129d60465bc288779f18e652f8f2a950d86b4e3da3f16a"
              alt="Saniya Rana presenting at an event"
              className="object-cover w-[89px] h-auto rounded-md shadow-sm"
            />
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/f58df05430a540677174fe961d5a580befd73c61c501429143943a41c41d5bf2"
              alt="Saniya Rana receiving an award"
              className="object-cover w-[72px] h-auto rounded-md shadow-sm"
            />
            <div className="relative flex justify-center items-center w-[111px] h-auto">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/830c3dd5adccc777518ad9a310b51c02a08cf9aca9fa98673d755daa366e5366"
                alt="Saniya Rana on a talk show background"
                className="object-cover w-full h-full rounded-md shadow-sm"
              />
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/2c9b99c602e8c37e631896a355f86e4bc94e17f94ea13989c7537ff31f24dd6f"
                alt="Play media"
                className="object-contain w-8 aspect-square absolute"
              />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default UserProfile;
