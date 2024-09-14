import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import avatar from '../asset/avtar.png';
import SuggestionSection from '../component/SuggestionSection'
import { useSelector, useDispatch } from 'react-redux';
import { fetchView } from '../slicer/profileViewSlice';

const YourJobs = ({ Title = 'Profile Views', link }) => {
  const dispatch = useDispatch();

  const viewdata = useSelector((state) => state.profileview.views)


  useEffect(() => {
    dispatch(fetchView())
  }, [])

  return (
    <div className=''>
      <div className='h-[100%] bg-[#FFEBA6] w-[270px] rounded-md shadow-md z-50'
        style={{ maxHeight: '400px' }}
      >
        <Link to={link}>
          <h2 className='pb-9 py-5 px-4 font-bold'>{Title}</h2></Link>

        <div className='flex flex-col justify-start '>

          {
            Object.values(viewdata).slice(0, 5).map((view) => {

              return (
                <SuggestionSection profileImage={view.user['profilePic']} Name={view.user['name']} Post={view.user['aspirations']} purpose={view.user['purpose']} userId={view.user['userId']} />
              )
            })
          }
        </div>

      </div>
    </div>

  )
}

export default YourJobs
