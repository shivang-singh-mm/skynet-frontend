import React from 'react';
import avatar from "../asset/avtar.png";
import { useNavigate } from 'react-router-dom';
import { GoPlusCircle } from "react-icons/go";
import { useSelector } from 'react-redux';


const Newpost = () => {
    const navigate = useNavigate('');

    const profile = useSelector((state) => state.profile.profile);
    const picture = profile.profilePic

    return (
        <div className='relative bg-[#F8D99D] lg:w-[100%] md:w-[80%] w-[100%]  h-[101px] rounded-md shadow-md'
            style={{ marginTop: '2px', maxWidth: '610px' }}
        >
            <div className='absolute flex flex-row gap-3 px-4 w-[100%] justify-start top-[31px]'>
                <div className='w-[48px] h-[48px] ' style={{ position: 'relative', overflow: 'hidden', borderRadius: '50%' }}>
                    <img src={picture}
                        style={{ display: 'inline', margin: 'auto', height: 'auto', width: '100%' }}
                    /></div>
                <div className='flex flex-row items-center gap-3'>
                    <p>Start a new post</p>
                    <button onClick={() => navigate('/addpost')}><GoPlusCircle size={30} /></button>
                </div>

            </div>
        </div>
    )
}

export default Newpost
