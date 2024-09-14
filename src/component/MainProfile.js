import React, { useEffect, useState } from 'react';
import avatar from "../asset/avtar.png";
import axios from 'axios';
import { FaEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'
import { OpenBioEdit, BioEditChek } from '../slicer/ModelSlicer';
import { useSelector, useDispatch } from 'react-redux'
import TestEdit from './TestEdit';

export default function MainProfile(props) {
    const navigate = useNavigate('');
    const dispatch = useDispatch();

    const isOpenEdit = useSelector((state) => state.model.isBioEditOpen);
    const profile = useSelector((state) => state.profile.profile);

    const [activeFollowButton, setActiveFollowButton] = useState(false);
    const baseUrl = process.env.REACT_APP_API_URL
    const handleFollow = (id) => {
        const data = {
            followeeUserId: localStorage.getItem('skyn_userId'),
            followerUserId: id,
            picture: profile.profilePic,
            name: profile.name,
        }
        axios.post(`${baseUrl}/follow`, data, {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('skyn_token'),
                'Content-Type': 'application/json'
            }
        })
        setActiveFollowButton(false);
    }

    const checkFollow = async () => {
        const data = {
            userId: localStorage.getItem('skyn_userId'),
            foreignId: props.userId
        }
        const response = await axios.post(`${baseUrl}/check/follow`, data, {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('skyn_token'),
                'Content-Type': 'application/json'
            }
        })
        const set = response.data.body.length === 0 ? true : false
        setActiveFollowButton(set)
    }

    useEffect(() => {
        checkFollow();
    }, [])

    return (
        <div className='relative bg-[#C0FCF8] shadow-md pb-5 flex flex-col w-[100%] bordered rounded-2xl p-1 h-[full]' style={{ minHeight: '200px' }}>
            <div className='relative flex items-center justify-around'>
                <div className=''>

                    <div className='lg:w-[100px] lg:h-[100px] md:h-[50px] md:w-[50px] h-[50px] w-[50px]' style={{ position: 'relative', overflow: 'hidden', borderRadius: '50%' }}>
                        <img src={props.picture} alt="profileimage"
                            style={{ display: 'inline', margin: 'auto', height: 'auto', width: '100%' }} />
                    </div>

                </div>
                <div className='font-normal md:text-xl md:p-4 p-2 justify-start flex flex-col text-black'>
                    <h2 className='z-1 font-bold lg:text-[25.93px] text-center md:text-[20.93px] text-[14px]'>{props.name}</h2>
                    <h2 className='relative w-[80%] lg:text-[14.93px] md:text-[11.93px] text-[8px] lg:2-[500px] md:w-[400px] w-[200px]' style={{ marginTop: '2%', maxWidth: '500px' }}>{props.aspirations}</h2>
                    <div className='flex flex-row gap-7 text-start text-[14px]'
                        style={{ fontWeight: 'bold' }}
                    >
                        <a href={`/followers/${props.userId} `}><p>{props?._count?.followers ? props?._count?.followers : 0} followers</p></a>
                        <a href={`/following/${props.userId}`}><p>{props?._count?.following ? props?._count?.following : 0} following</p></a>
                    </div>
                </div>

                <div className='mt-10'>

                    {props.edit === true ?
                        <FaEdit size={30} onClick={() => dispatch(OpenBioEdit()) /*navigate('/bioedit')*/} className='lg:h-[30.93px] md:h-[19.93px] h-[16px]' />
                        : <></>
                    }

                </div>
                <TestEdit isOpen={isOpenEdit} />
            </div>
            <div className='font-normal text-xl leading-none flex text-black relative px-5 items-center gap-5 py-3'>
                <div className='flex flex-row items-start gap-3'>
                    <br />
                    <br />
                </div >
                <div className='flex flex-col items-start gap-3'>
                    <div className='flex flex-row gap-5 items-center'>
                        <h5 className=' font-normal lg:text-[22.93px] md:text-[16.93px] text-[10px]'>Summary</h5>

                        {
                            props.edit === false
                                ? <>{
                                    activeFollowButton == true
                                        ? <button className='px-4 py-1 border border-sky-500 rounded-full text-sm' onClick={() => {
                                            handleFollow(props.userId)
                                            this.disabled = "true"
                                        }} style={{ marginTop: '2px' }}>Follow</button>
                                        : <button className='px-4 py-1 border border-sky-500 rounded-full text-sm' disabled={true}>Following</button>
                                }</>
                                : <></>
                        }


                    </div>

                    <div className='font-noto-serif font-normal lg:text-[15.93px] md:text-[10.93px] text-[11px] text-black' style={{ width: '80%', lineHeight: '20px', fontFamily: 'Source Sans Pro' }}>{props.bio}</div>
                </div>
            </div>
        </div>
    )
}
