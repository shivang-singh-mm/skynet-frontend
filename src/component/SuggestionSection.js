import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const Suggestions = ({ profileImage, Name, Post, purpose, userId }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/user/${userId}`)
    }

    return (
        <button className='flex flex-row items-center justify-start md:gap-2 hover:scale-105' style={{ marginLeft: "10px" }} onClick={handleClick}>
            <div className='w-[50px] h-[50px] ' style={{ position: 'relative', overflow: 'hidden', borderRadius: '50%' }}>
                <img src={profileImage} alt="profileimage"
                    style={{ display: 'inline', margin: 'auto', height: 'auto', width: '100%' }} />
            </div>
            <div className='flex flex-col items-start' style={{ maxWidth: '200px' }}>
                <div className='flex flex-col items-start'>
                    <p className='text-[13px]'>{Name} &nbsp; </p>
                    <span className='md:text-[8px] lg:text-[10px] text-[8px] text-black'>{purpose}</span>
                </div>
                {/* <p className=' text-[9px] flex flex-row gap-2 justify-between' style={{ width: 'fit-content', marginLeft: '0px' }}>{Post}</p> */}
            </div>
        </button>
    )
}

export default Suggestions
