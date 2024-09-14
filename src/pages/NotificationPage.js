import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function NotificationPage() {

  const baseUrl = process.env.REACT_APP_API_URL
  const navigate = useNavigate('')


  const [notification, setNotification] = useState('')

  const fetchNotification = async () => {
    const userId = localStorage.getItem('skyn_userId')
    const response = await axios.get(`${baseUrl}/notification/${userId}`, {
      headers: {
        'authorization': 'Bearer ' + localStorage.getItem('skyn_token'),
        'Content-Type': 'application/json'
      }
    })
    console.log(response);
    setNotification(response.data.body)
  }

  const handleRedirect = (userId) => {
    navigate(`/user/${userId}`)
  }

  useEffect(() => {
    fetchNotification()
  }, [])
  return (
    <div className="flex justify-start h-screen bg-gray-100 w-800 marginNoti"
      style={{ marginTop: '100px', height: 'fit-content' }}
    >
      <div className="bg-white rounded-lg shadow-md w-800 p-5"
        style={{ minWidth: '380px', maxWidth: '480px' }}
      >
        <section className="notifications mb-5">
          <h2 className="text-2xl font-semibold mb-5">Notifications</h2>
          <div className="notification-section space-y-4">
            {
              notification != '' ? <>{
                Object.values(notification).map((data) => {
                  const bg = 'bg-cyan-50';
                  if (data.read === true) bg = 'bg-gray-100'
                  return (
                    data?.notificationType === 'LIKE' ? <a
                      className={`notification flex items-center p-3 rounded-lg bg-cyan-50 ${bg} gap-3 hover:bg-cyan-100 hover:scale-105 transform transition`}
                    >
                      <div className='lg:w-[60px] lg:h-[60px] md:h-[50px] md:w-[50px] h-[50px] w-[50px]' style={{ position: 'relative', overflow: 'hidden', borderRadius: '50%' }}>
                        <img src={data.redirect.profilePic} alt="profileimage"
                          style={{ display: 'inline', margin: 'auto', height: 'auto', width: '100%' }} />
                      </div>
                      <div className="notification-text text-lg text-gray-800">
                        <button onClick={(e) => handleRedirect(data.redirectId)}>{data.name}</button> liked your post.
                      </div>
                    </a>
                      : data?.notificationType === 'FOLLOW' ? <a
                        className={`notification flex items-center p-3 rounded-lg bg-cyan-50 ${bg} gap-3 hover:bg-cyan-100 hover:scale-105 transform transition`}
                      >
                        <div className='lg:w-[60px] lg:h-[60px] md:h-[50px] md:w-[50px] h-[50px] w-[50px]' style={{ position: 'relative', overflow: 'hidden', borderRadius: '50%' }}>
                          <img src={data.redirect.profilePic} alt="profileimage"
                            style={{ display: 'inline', margin: 'auto', height: 'auto', width: '100%' }} />
                        </div>
                        <div className="notification-text text-lg text-gray-800">
                          <button onClick={(e) => handleRedirect(data.redirectId)}>{data.name}</button> started following you.
                        </div>
                      </a>
                        : <a
                          className={`notification flex items-center p-3 rounded-lg bg-cyan-50 ${bg} gap-3 hover:bg-cyan-100 hover:scale-105 transform transition`}
                        >
                          <div className='lg:w-[60px] lg:h-[60px] md:h-[50px] md:w-[50px] h-[50px] w-[50px]' style={{ position: 'relative', overflow: 'hidden', borderRadius: '50%' }}>
                            <img src={data.redirect.profilePic} alt="profileimage"
                              style={{ display: 'inline', margin: 'auto', height: 'auto', width: '100%' }} />
                          </div>
                          <div className="notification-text text-lg text-gray-800">
                            <button onClick={(e) => handleRedirect(data.redirectId)}>{data.name}</button> commented on your post.
                          </div>
                        </a>
                  )
                })
              }</>
                : <></>
            }



          </div>
        </section>
      </div>
    </div>
  )
}

export default NotificationPage