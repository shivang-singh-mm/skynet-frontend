import React from 'react';
import Result from '../component/Result';
import Explore from '../component/Explore';
import Filters from '../component/Filters'
import { useOutletContext } from 'react-router-dom';

export default function Homepage() {

  const { activeButton, setActiveButton } = useOutletContext();

  return (
    <div className='relative py-3 grid md:grid-cols-6 grid-cols-1 gap-4 md:px-4 p-2 lg:px-10 justify-around'>
      <div className='relative flex flex-col gap-3 justify-center items-center col-span-1 md:col-span-4'>
        <div className='' style={{ marginTop: '40px' }}>
          <Filters Button1={activeButton} Button2='experience' Button3='Job Type' sectorValue={activeButton} />
        </div>
        <Result />
      </div>

      <div className='relative flex flex-col gap-3  items-center col-span-2'
        style={{ marginTop: '100px' }}
      >
        <div className='fixed w-[260px]'>
          <Explore activeButton={activeButton}
            setActiveButton={setActiveButton} />
        </div>
      </div>


    </div>
  )
}
