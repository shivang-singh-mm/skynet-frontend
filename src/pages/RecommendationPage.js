import React, { useEffect, useState } from 'react';
import avatar from '../asset/avtar.png';
import { useSelector, useDispatch } from 'react-redux';
import { featchSuggestion } from '../slicer/SuggestionSlicer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'


export default function Homepage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const suggestion = useSelector((state) => state.suggestion.suggestions)

  // const 
  const [idArray, setIdArray] = useState([])
  const baseUrl = process.env.REACT_APP_API_URL
  const search_data = useSelector((state) => state.search.search)
  const handleFollow = (id) => {
    const data = {
      followeeUserId: localStorage.getItem('skyn_userId'),
      followerUserId: id
    }
    axios.post(`${baseUrl}/follow`, data, {
      headers: {
        'authorization': 'Bearer ' + localStorage.getItem('skyn_token'),
        'Content-Type': 'application/json'
      }
    })
    const arr = [...idArray, id]
    setIdArray(arr);
    console.log(idArray)
  }

  const handleVistuser = (email, user_id) => {

    const viewData = {
      userId: localStorage.getItem('skyn_userId'),
      date: new Date(),
      email,
    }

    dispatch(CreatView(viewData))
    navigate(`/user/${user_id}`)
  }

  useEffect(() => {
    dispatch(featchSuggestion());
  }, [dispatch])

  return (
    <div className='relative py-9 flex flex-row gap-4 px-10 justify-around'>
      <div className='relative w-[100%]  h-[786px] my-5'>
        <div className='flex flex-row justify-start items-center flex-wrap md:mx-10 mx-2 p-10  gap-10'>
          {
            Object.values(suggestion).map((data) => {
              return (
                <div className='w-60 h-auto hover:scale-110 bg-[#FFFFFF] shadow-md rounded-lg flex flex-col items-center'>
                  <button className='' onClick={() => handleVistuser(data.email, data.userId)}>
                    <div className='py-6 items-center'>
                      {/* <button className='items-center'> */}
                      <div className="flex items-center justify-center h-20 w-20 overflow-hidden rounded-full mx-auto">
                        <img className='object-cover' src={data.profilePic} alt="User Avatar" />
                      </div>
                      {/* </button> */}
                      <div className='text-center py-1'>
                        <p className='font-semibold text-lg'>{data.name}</p>
                        <p className='font-light text-base'>{data.aboutJobTitle}</p>
                      </div>

                      <div className='px-5 py-2 items-center'>
                        <p className='break-words text-[9px]'>{data.aspirations}</p>
                      </div>

                    </div>
                  </button>
                  <div className='flex items-center justify-center pb-6'>
                    {
                      idArray.includes(data.userId)
                        ? <button className='px-6 py-2 border border-sky-500 rounded-full text-sm' disabled={true}>Following</button>
                        : <>{
                          data.followers.length === 0
                            ? <button className='px-6 py-2 border border-sky-500 rounded-full text-sm' onClick={() => {
                              handleFollow(data.userId)
                              this.disabled = "true"
                            }} style={{ marginTop: '2px' }}>Follow</button>
                            : <button className='px-6 py-2 border border-sky-500 rounded-full text-sm' disabled={true}>Following</button>
                        }</>
                    }



                  </div>
                </div>
                // <div className='w-60 h-auto bg-[#EDEDED40] shadow-md rounded-lg flex flex-col justify-between' onClick={() => navigate(`/user/${data.userId}`)}>
                //   <div className='py-6'>
                //     <div className="flex items-center justify-center h-20 w-20 overflow-hidden rounded-full mx-auto">
                //       <img className='object-cover' src={data.profilePic} alt="User Avatar" />
                //     </div>
                //     <div className='text-center py-1'>
                //       <p className='font-semibold text-lg'>{data.name}</p>
                //       <p className='font-light text-[11px]'>{data.purpose}</p>
                //     </div>

                //     <div className='px-5 py-6'>
                //       <p className='break-words text-[12px]'>{data.aspirations}</p>
                //     </div>
                //   </div>
                //   <div className='flex items-center justify-center pb-6'>
                //     <button className='px-6 py-2 border border-sky-500 rounded-full text-sm'>Follow</button>
                //   </div>
                // </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}
