import React, { useEffect } from 'react';
import Profile from '../component/Profile';
import Explore from '../component/Explore';
import Newpost from '../component/Newpost';
import Post from '../component/Post';
import Suggestions from '../component/Suggestions';
import { useOutletContext, useParams } from 'react-router-dom';
import HomeBackground from '../asset/HomeBackground.png'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPosts } from '../slicer/postSlicer'
import YourJobs from '../component/YourJobs';
import '../component/css/margin.css'

export default function Homepage() {

  const { activeButton, setActiveButton } = useOutletContext();

  const dispatch = useDispatch();

  const status = useSelector((state) => state.auth.status);
  const error = useSelector((state) => state.auth.error);
  const posts = useSelector((state) => state.post.posts);
  const userId = localStorage.getItem('skyn_userId')


  useEffect(() => {
    dispatch(fetchPosts(userId))

  }, [dispatch])

  return (
    <div className='py-3 grid lg:grid-cols-11 marginDiv md:grid-cols-3 gap-10 grid-cols-5 items-start justify-around p-2 lg:px-10'
      style={{ marginTop: "80px" }}
    >
      {/* <img src={HomeBackground} alt="backgroundimage" width="100%" height="100%" className='absolute z-0 w-[100vw] h-[100vh] mx-auto'/> */}
      <div className='flex flex-col lg:col-span-2 max-md:hidden col-span-1 static'
      // style={{ margin: '0% auto auto 50%' }}
      >
        <div className='fixed'>
          <Profile />
          <Explore
            activeButton={activeButton}
            setActiveButton={setActiveButton}
          />
        </div>
      </div>

      <div className='flex flex-col gap-2 col-span-10 max-md:col-span-5 lg:col-span-5'
        style={{ marginLeft: '0%' }}
      >
        {/* <div className='w-[50vw] h-[1px] bg-slate-500 my-5 z-50'></div> */}

        {
          Object.values(posts).map((data) => {
            return (
              <Post user_name={data.user['name']} posted_date={data.date} caption={data.caption} like_count={data._count['like']} comment_count={data._count['comment']} post_id={data.id} mediaLink={data.mediaLink} like={data.like} profilePic={data.user.profilePic} landmark={data.landmark} />
            )
          })
        }
      </div>

      <div className='z-10 w-[104%] max-md:hidden col-span-3'
        style={{ maxWidth: "390px" }}
      >
        <div className='absolute flex flex-col gap-3'>
          <Suggestions link="/grownetwork" />
          <Newpost />
        </div>

        <div className='pt-5'>
          {/* <YourJobs link="/grownetwork" /> */}
        </div>
      </div>

    </div>
  )
}