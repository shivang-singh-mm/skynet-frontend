import React from 'react';

const Suggestions = ({JobName, Skills}) => {
  return (  <div className='bg-[#f8d696] w-[100%] flex flex-row justify-evenly text-center mix-blend-darken border border-[#757373] shadow-md rounded-[10px] box-border py-1 px-1'>
              <button className='flex flex-row gap-2 px-3 w-[100%]'>
                  <div className='flex flex-col'>
                      <div className='flex flex-row gap-1'>
                          <h3 className='font-inter font-bold text-base leading-normal text-black'>{JobName}</h3>
                      </div>
                      <p className='font-inter font-normal text-xs leading-normal flex items-center text-black'>{Skills}</p>
                  </div>
              </button>
              <a class="font-inter font-normal text-[12.8px] flex items-center text-[#7E7C7C]">View job</a>
            </div>
  )
}

export default Suggestions
