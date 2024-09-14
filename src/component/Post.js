import React, { useState } from 'react'
import avatar from '../asset/avtar.png';
import PostBackground from '../asset/PostBackground.png'
import avtar from '../asset/avtar.png'
import { FcLike } from "react-icons/fc";
import './css/post.css';
import CommentBox from './CommentBox';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComment, likePost, unLikePost } from '../slicer/postSlicer'


const Post = ({ width = 'w-[40vw]', user_name, posted_date, caption, comment_count, like_count, post_id, mediaLink, like, profilePic, landmark }) => {

  const profile = useSelector((state) => state.profile.profile);

  const [showComponent, setShowComponent] = useState(false);

  const [liked, setLike] = useState(like.length == 0 ? 'grey' : 'blue');
  const [likeCount, setLikeCount] = useState(like_count);


  const dispatch = useDispatch();
  const createdDate = (new Date(posted_date)).toString();
  const datePart = new Date(createdDate).toDateString();

  const comment = useSelector((state) => state.post.comment)

  const handleLike = async () => {
    const data = {
      postId: post_id,
      userId: localStorage.getItem('skyn_userId'),
      likeType: "POST",
      commentId: '',
      name: profile.name,
      picture: profile.profilePic
    }
    if (liked === 'grey') {
      dispatch(likePost(data))

      setLikeCount(likeCount + 1);
      setLike('blue');
    }
    else {
      dispatch(unLikePost(data));

      setLikeCount(likeCount - 1);
      setLike('grey');
    }

  }

  const handleToggle = () => {
    setShowComponent(!showComponent);
    dispatch(fetchComment(post_id))
  };

  const formatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    // hour: '2-digit',
    // minute: '2-digit',
  });


  return (

    <div class="max-w-xl md:w-[100%] w-[100%] lg:w-[565px] mx-auto display-inline inline-block snap-x" style={{ minWidth: '350px', maxWidth: '565px' }}>
      <div class="bg-white rounded-lg shadow-md">
        <div class="flex items-center px-4 py-3 border-b gap-4">
          <div className='w-[42px] h-[42px] ' style={{ position: 'relative', overflow: 'hidden', borderRadius: '50%' }}>
            <img src={profilePic} alt="profileimage"
              style={{ display: 'inline', margin: 'auto', height: 'auto', width: '100%' }} />
          </div>
          <div>
            <h3 class="text-lg font-semibold">{user_name} &nbsp; &nbsp; <span className='text-[15px] font-normal'>{landmark}</span><span class="text-sm text-gray-600"></span></h3>

            <p class="text-sm text-gray-600">Posted on {datePart}</p>
          </div>
        </div>

        <div class="px-4 py-2">
          <p class="text-lg">{caption}</p>
          <div className='' style={{ position: 'relative', overflow: 'hidden', maxHeight: '600px' }}>
            <img src={`${mediaLink}`} alt="Post Image" class="mt-2 rounded-sm" style={{ width: '100%', height: 'auto', margin: 'auto', display: 'inline' }} />
          </div>

        </div>

        <div class="flex items-center justify-between px-10 py-2 border-t">
          <button class="flex items-center space-x-1 text-gray-600 hover:text-blue-500" onClick={handleLike}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width='3.5' stroke={liked} class="w-6 h-6 ">
              <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
            </svg>

            <span>{likeCount}</span>
          </button>
          <button class="flex items-center space-x-1 text-gray-600 hover:text-green-500" onClick={handleToggle}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
            </svg>


            <span>{comment_count}</span>
          </button>


          <button class="flex items-center space-x-1 text-gray-600 hover:text-pink-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
            </svg>

            <span>Share</span>
          </button>
        </div>
      </div>

      {showComponent && <CommentBox comment={comment} postId={post_id} />}

    </div>


  )
}

export default Post
