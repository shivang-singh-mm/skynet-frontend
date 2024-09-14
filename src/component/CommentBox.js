import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaReply, FaUserCircle, FaHeart, FaArrowAltCircleRight } from "react-icons/fa";
import { useSelector } from 'react-redux';

function CommentBox({ postId }) {
  const user_id = localStorage.getItem('skyn_userId');
  const baseUrl = process.env.REACT_APP_API_URL
  const profile = useSelector((state) => state.profile.profile);
  console.log(profile)

  const [comments, setComments] = useState([]);
  // const [commentCount, setCommentCount] = useState(c)
  const [showReply, setShowReply] = useState(false)

  const [formData, setFormData] = useState({
    userId: user_id,
    text: '',
    postId: postId,
    commentType: 'POST',
    //parentCommentId: null, // To track parent comment for nested replies
  });

  const [formDataCoc, setFormDataCoc] = useState({
    userId: user_id,
    text: '',
    //postId: postId,
    commentType: 'COMMENT',
    parentCommentId: '', // To track parent comment for nested replies
  });



  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchComments();
    fetchSubComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const pageNo = 1;
      const pageSize = 10;
      const response = await axios.get(`${baseUrl}/comment/get/${pageNo}/${pageSize}?parentCommentId&postId=${postId}`, {
        headers: {
          'authorization': 'Bearer ' + localStorage.getItem('skyn_token'),
          'Content-Type': 'application/json'
        }
      });
      setComments(response.data.body || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubComments = async (parentCommentId) => {
    try {
      const pageNo = 1;
      const pageSize = 10;
      const response = await axios.get(`${baseUrl}/comment/get/${pageNo}/${pageSize}?parentCommentId=${parentCommentId}&postId=`, {
        headers: {
          'authorization': 'Bearer ' + localStorage.getItem('skyn_token'),
          'Content-Type': 'application/json'
        }
      });
      setComments(prevComments => {
        return prevComments.map(comment =>
          comment.id === parentCommentId
            ? { ...comment, replies: response.data.body || [] }
            : comment
        );
      });
    } catch (error) {
      console.error('Error fetching sub-comments:', error);
    }
  };

  const handleShowReply = (e) => {
    e.preventDefault();
    setShowReply(!showReply);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleChangeCoc = (e) => {
    const { name, value } = e.target;
    setFormDataCoc({
      ...formDataCoc,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFormData = {
      ...formData,
      picture: profile.profilePic,
      name: profile.name
    };

    try {
      await axios.post(`${baseUrl}/comment/create`, updatedFormData, {
        headers: {
          'authorization': 'Bearer ' + localStorage.getItem('skyn_token'),
          'Content-Type': 'application/json'
        }
      });
      setFormData({ ...formData, text: '' });
      // set
      fetchComments();
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  const handleSubmitCoc = async (e, parentCommentId) => {
    e.preventDefault();

    const updatedFormDataCoc = {
      ...formDataCoc,
      parentCommentId: parentCommentId,
    };
    try {
      const response = await axios.post(`${baseUrl}/comment/create`, updatedFormDataCoc, {
        headers: {
          'authorization': 'Bearer ' + localStorage.getItem('skyn_token'),
          'Content-Type': 'application/json'
        }
      });
      setFormDataCoc({ ...formDataCoc, text: '' });
      fetchSubComments();

    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  const formatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const renderComments = (comments) => {
    return comments.map((data) => (
      <div key={data.id} className="comments">
        {/* <div className="comment-react flex mt-2"> */}
        {/* <button>
            <FaHeart />
          </button>
          <hr />
          <span>{data['_count'].like}</span> */}
        {/* </div> */}

        <div className="comment-container w-[200px]" style={{ minWidth: '300px' }}>
          <div className="user">
            <div className="user-pic">
              <img src={data.user.profilePic}
                className='lg:h-[40px] lg:w-[40px] md:h-[30px] md:w-[30px] h-[25px] w-[25px]'
                style={{ borderRadius: '100%' }} />
            </div>
            <div className="user-info">
              <span>{data.user.name}</span>
              <p>{formatter.format(new Date(data.date))}</p>
            </div>
          </div>
          <p className="comment-content text-[20px]" style={{ marginLeft: '15%' }}>{data.text}</p>



          <div className="reply-box">
            <form onSubmit={(e) => handleSubmitCoc(e, data.id)}>


              {
                showReply ? <>
                  <div className="box-container">
                    <input
                      placeholder="Reply"
                      type="text"
                      id="text"
                      name="text"
                      value={formDataCoc.text}
                      onChange={handleChangeCoc}
                      required
                      className='lg:w-[400px] md:w-[300px] w-[250px]'
                    ></input>
                    <div className='flex flex-row gap-4'>
                      <button type="submit" className="send" title="Send">
                        <FaArrowAltCircleRight />

                      </button>
                      <button type="reset" onClick={handleShowReply} >Hide</button>
                    </div>
                  </div></> :
                  <div className='flex flex-row gap-4'>
                    <button type="reset" onClick={handleShowReply} className='text-[13px]' style={{ marginLeft: '15%' }}>Reply</button>
                  </div>
              }



            </form>
          </div>
          <div className="sub-comment">
            {data._count['comment'] == 0 ? <></> :
              <>{data.replies && data.replies.length > 0 && renderComments(data.replies)}
                {!data.replies && (
                  <button onClick={() => fetchSubComments(data.id)} style={{ marginLeft: '15%' }}>Show Replies</button>
                )}</>
            }

          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="card">
      <span className="title">Comments</span>
      <div className="comm-says">
        {loading ? <p>Loading comments...</p> : renderComments(comments)}
      </div>

      <div className="text-box">
        <form onSubmit={handleSubmit}>
          <div className="box-container">
            <textarea
              placeholder="Reply"
              type="text"
              id="text"
              name="text"
              value={formData.text}
              onChange={handleChange}
              required
              style={{ backgroundColor: '#F5F5F5' }}
            ></textarea>
            <div>
              <button type="submit" className="send" title="Send">
                <FaArrowAltCircleRight />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CommentBox;
