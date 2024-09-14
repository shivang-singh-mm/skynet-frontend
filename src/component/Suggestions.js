import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import avatar from '../asset/avtar.png';
import SuggestionSection from '../component/SuggestionSection'
import { useSelector, useDispatch } from 'react-redux';
import { featchSuggestion } from '../slicer/SuggestionSlicer';
import { useNavigate } from 'react-router-dom';


const Suggestions = ({ Title = 'Recommended For You', link }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const suggestion = useSelector((state) => state.suggestion.suggestions)


  useEffect(() => {
    dispatch(featchSuggestion());
  }, [dispatch])

  return (
    <div className=''>
      <div className='h-[360px] pb-4 bg-[#C0FCF8] w-[270px] rounded-md shadow-md'>
        <Link to='/recommendation'>
          <h2 className=' py-8 ml-4 font-bold text-[15px]' style={{ marginLeft: "10px" }}>{Title}</h2>
        </Link>

        <div className='flex flex-col gap-y-3 justify-center '>
          {
            Object.values(suggestion).slice(0, 4).map((data, index) => {
              return (
                <SuggestionSection key={index} profileImage={data.profilePic} Name={data.name} Post={data.aspirations} purpose={data.purpose} userId={data.userId} />
              )
            })
          }


          {Object.values(suggestion).length > 5 && (
            <button onClick={() => navigate('/recommendation')}>More</button>
          )}

        </div>

      </div>
    </div>
  )
}

export default Suggestions
