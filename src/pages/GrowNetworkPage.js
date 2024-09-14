import React from 'react'
import Explore from '../component/Explore';
import Filters from '../component/Filters'
import Result from '../component/Result';

function GrowNetworkPage() {
  return (
    <div>
        <div className='relative py-3 flex flex-row gap-4 px-10 justify-around'>
        <div className='relative flex flex-col gap-3 justify-center items-center'>

        <Result/>
        </div>



        </div>
    </div>
  )
}

export default GrowNetworkPage