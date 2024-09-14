import React, { useEffect, useState } from 'react'
import YourJobs from '../component/YourJobs'
import Suggestions from '../component/Suggestions';
import Post from '../component/Post';
import { RiPencilFill } from "react-icons/ri";
import EducationCardsSection from '../component/EducationCardsSection'
import ExperienceCardsSection from '../component/ExperienceCardsSection';
import TimeLineCardsSection from '../component/TimeLineCardsSection'
import MainProfile from '../component/MainProfile';
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser, ViewUser } from '../slicer/profileSlice'
import AboutMe from '../component/AboutMe';
import { useParams, useNavigate } from 'react-router-dom';

function UserPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate('')

    const { id } = useParams();

    const user = useSelector((state) => state.profile.user)
    const [postArr, setPost] = useState('');

    useEffect(() => {
        if (user.post?.length > 0)
            setPost(user?.post[0])
    }, [user]);

    useEffect(() => {
        dispatch(ViewUser(id))
    }, [dispatch]);

    const navigatePost = () => {
        navigate(`/post/${id}`)
    }

    return (
        <div className='py-9 grid grid-cols-11 max-md:grid-cols-6 px-3 gap-2 justify-evenly' style={{ marginTop: '60px' }}>
            <div className='col-span-1'></div>
            <div className='relative flex flex-col gap-3 col-span-6 md:col-span-6'>
                <div className='relative flex flex-col gap-10 divMargin'>
                    <MainProfile name={user.name} aspirations={user.aspirations} bio={user.bio} picture={user.profilePic} edit={false} userId={id} follow={user.followers} _count={user._count} />
                    <AboutMe skills_display='hidden' aboutJobTitle={user.aboutJobTitle} aboutYou={user.aboutYou} city={user.city} comapnyId={user.comapnyId} email={user.email} experience={user.experience} githubURL={user.githubURL} jobTitle={user.jobTitle} linkedInURL={user.linkedInURL} phoneCode={user.phoneCode} phone={user.phone} purpose={user.purpose} edit={false} />
                    <EducationCardsSection Title='Education' skills_display='hidden' edit={false} userid={id} PURPOSE={'STUDENT'} />
                    <EducationCardsSection Title='Experience' skills_display='hidden' edit={false} userid={id} PURPOSE={'FREELANCER'} />
                    <TimeLineCardsSection Title='Time Line' cards_bg='' edit_display='hidden' time_display='flex' add_display='hidden' skills_display='hidden' duration_display='hidden' font_weight='font-normal' line_color='bg-[#000000]' edit={false} userId={id} />
                    <div>
                        {
                            postArr === ''
                                ? <>

                                </>
                                : <>
                                    <Post user_name={user['name']} posted_date={postArr.date} caption={postArr?.caption} like_count={postArr?._count['like']} comment_count={postArr?._count['comment']} post_id={postArr?.id} mediaLink={postArr?.mediaLink} profilePic={user.profilePic} landmark={postArr?.landmark} like={postArr?.like} />
                                    <button onClick={navigatePost} style={{ margin: 'auto 0 auto 60%' }}><p>View All Posts</p></button>
                                </>
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserPage
