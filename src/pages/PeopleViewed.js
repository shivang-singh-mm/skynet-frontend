import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchView } from '../slicer/profileViewSlice'
import { useNavigate } from 'react-router-dom';
import avatar from "../asset/avtar.png";
import axios from 'axios';
import { CreatView } from '../slicer/profileViewSlice';

function PeopleViewed() {

  const views = useSelector((state) => state.profileview.views)
  const profile = useSelector((state) => state.profile.profile);


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
      followerUserId: id,
      name: profile.name,
      picture: profile.profilePic
    }
    axios.post(`${baseUrl}/follow`, data, {
      headers: {
        'authorization': 'Bearer ' + localStorage.getItem('skyn_token'),
        'Content-Type': 'application/json'
      }
    })
    const arr = [...idArray, id]
    setIdArray(arr);
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
    dispatch(fetchView())
  }, [dispatch])


  return (
    <div>
      <div className='relative py-3 flex flex-row gap-4 px-10 justify-around'>
        <div className='relative flex flex-col gap-3 justify-start items-start'>

          <div className='relative w-[100%]  h-[786px] my-5'>
            <div className='flex flex-row justify-start items-start flex-wrap md:mx-10 mx-2 p-10  gap-10'>
              {
                Object.values(views).map((data) => {

                  return (
                    <div className='w-60 h-auto hover:scale-110 bg-[#FFFFFF] shadow-md rounded-lg flex flex-col items-center'>
                      <button className='' onClick={() => handleVistuser(data.user.email, data.user.userId)}>
                        <div className='py-6 items-center'>
                          {/* <button className='items-center'> */}
                          <div className="flex items-center justify-center h-20 w-20 overflow-hidden rounded-full mx-auto">
                            <img className='object-cover' src={data.user.profilePic} alt="User Avatar" />
                          </div>
                          {/* </button> */}
                          <div className='text-center py-1'>
                            <p className='font-semibold text-lg'>{data.user.name}</p>
                            <p className='font-light text-base'>{data.user.aboutJobTitle}</p>
                          </div>

                          <div className='px-5 py-2 items-center'>
                            <p className='break-words text-[9px]'>{data.user.aspirations}</p>
                          </div>

                        </div>
                      </button>
                      <div className='flex items-center justify-center pb-6'>
                        {/* {
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
                        } */}



                      </div>
                    </div>

                    // <div className='w-60 h-auto bg-[#EDEDED40] shadow-md rounded-lg flex flex-col justify-start' onClick={() => navigate(`/user/${data.user['userId']}`)}>
                    //   <div className='py-6'>
                    //     <div className="flex items-center justify-center h-20 w-20 overflow-hidden rounded-full mx-auto">
                    //       <img className='object-cover' src={data.user['profilePic']} alt="User Avatar" />
                    //     </div>
                    //     <div className='text-center py-1'>
                    //       <p className='font-semibold text-lg'>{data.user['name']}</p>
                    //       <p className='font-light text-[12px]'>{data.user['purpose']}</p>
                    //     </div>

                    //     <div className='px-5 py-6'>
                    //       <p className='break-words text-[13px]'>{data.user['aspirations']}</p>
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
      </div>
    </div>
  )
}

export default PeopleViewed