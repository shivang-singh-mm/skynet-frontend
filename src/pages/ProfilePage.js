import React, { useEffect, useState, useRef } from 'react';
import YourJobs from '../component/YourJobs'
import Suggestions from '../component/Suggestions';
import Post from '../component/Post';
import EducationCardsSection from '../component/EducationCardsSection'
import TimeLineCardsSection from '../component/TimeLineCardsSection'
import MainProfile from '../component/MainProfile';
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from '../slicer/profileSlice'
import AboutMe from '../component/AboutMe';
import '../component/css/scrollbar.css'
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
    const dispatch = useDispatch();

    const navigate = useNavigate('');

    const profile = useSelector((state) => state.profile.profile);
    const [postArr, setPost] = useState('');

    useEffect(() => {
        dispatch(fetchUser())

    }, [dispatch])

    useEffect(() => {
        if (profile.post?.length > 0)
            setPost(profile?.post[0])
    }, [profile])

    const navigatePost = () => {
        navigate(`/post/${profile.userId}`)
    }


    return (
        <div className='relative  lg:px-9 px-4 flex  flex-col py-3 justify-evenly gap-9'>

            <div className='py-9 grid grid-cols-11 max-md:grid-cols-6 px-3 gap-2 justify-evenly' style={{ marginTop: '5%' }}>
                <div className='col-span-1'></div>
                <div className='relative flex flex-col gap-3 col-span-6 md:col-span-6'>
                    <div className='relative flex flex-col gap-10 divMargin'>
                        <MainProfile name={profile.name} aspirations={profile.aspirations} bio={profile.bio} picture={profile.profilePic} edit={true} _count={profile._count} userId={profile.userId} />
                        <AboutMe skills_display='hidden' aboutJobTitle={profile.aboutJobTitle} aboutYou={profile.aboutYou} city={profile.city} comapnyId={profile.comapnyId} email={profile.email} experience={profile.experience} githubURL={profile.githubURL} jobTitle={profile.jobTitle} linkedInURL={profile.linkedInURL} phoneCode={profile.phoneCode} phone={profile.phone} purpose={profile.purpose} edit={true} tags={profile.tags} />
                        <EducationCardsSection Title='Education' skills_display='hidden' edit={true} PURPOSE={'STUDENT'} userid={null} userId={profile.userId} />
                        <EducationCardsSection Title='Experience' skills_display='hidden' edit={true} PURPOSE={'FREELANCER'} userId={profile.userId} />
                        <TimeLineCardsSection Title='Time Line' cards_bg='' edit_display='hidden' time_display='flex' add_display='hidden' skills_display='hidden' duration_display='hidden' font_weight='font-normal' line_color='bg-[#000000]' userId={profile.userId} edit={true} />
                        <div>
                            {
                                postArr === ''
                                    ? <>

                                    </>
                                    : <>
                                        <Post user_name={profile['name']} posted_date={postArr.date} caption={postArr?.caption} like_count={postArr?._count['like']} comment_count={postArr?._count['comment']} post_id={postArr?.id} mediaLink={postArr?.mediaLink} profilePic={profile.profilePic} landmark={postArr?.landmark} like={postArr?.like} />
                                        <button onClick={navigatePost} style={{ margin: 'auto 0 auto 60%' }}><p>View All Posts</p></button>
                                    </>
                            }

                        </div>
                    </div>
                </div>
                <div className='col-span-2 max-md:hidden'>
                    <div className='fixed flex flex-col gap-5'>
                        <Suggestions Title='Grow your network' link="/grownetwork" />
                        <YourJobs link="/view" />
                    </div>
                </div>
            </div>
        </div >
    )
}
