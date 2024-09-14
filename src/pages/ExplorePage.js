import React from 'react';
import Result from '../component/Result';
import Explore from '../component/Explore';
import Filters from '../component/Filters'
import { useOutletContext } from 'react-router-dom';

export default function Homepage() {
  const { activeButton, setActiveButton } = useOutletContext();
  return (
    <div className='relative py-3 flex flex-row gap-4 px-10 justify-around'>
        <div className='relative flex flex-col gap-3 justify-center items-center'>
        <Filters Button1='Company' Button2={activeButton} Button3='City'/>
          <Result/>
        </div>

        <div className='relative flex flex-col gap-3 justify-center items-center'>
          <Explore
          activeButton={activeButton} 
          setActiveButton={setActiveButton}/>
        </div>


    </div>
  )
}
