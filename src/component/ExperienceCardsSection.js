import React from 'react';
import { IoIosAddCircleOutline } from "react-icons/io";
import EducationCards from './EducationCards';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHistory } from '../slicer/profileSlice';

export default function EducationCardsSection({ Title, add_display = 'flex', line_color = 'bg-[#C6C5C5]', cards_bg = 'bg-[#eeeced]', edit_display = 'flex', time_display = 'hidden', duration_display = 'flex', skills_display = 'flex', font_weight = 'font-medium', edit, userId }) {

    const navigate = useNavigate('');
    const dispatch = useDispatch('');

    const handleAddEduction = () => {
        navigate('/addeducation')
    }

    const profileHistory = useSelector((state) => state.profile.history);


    useEffect(() => {
        dispatch(fetchHistory(userId))
    }, [dispatch])

    return (
        <div className='relative w-[100%] bg-[#FFFFFF] rounded-md shadow-md bg-opacity-40 pb-24' style={{ maxWidth: "950" + "px", backgroundColor: 'white' }}>
            <div className='flex flex-row lg:p-10 p-8 px-4 items-center'>
                <h1 className='font-david-libre font-normal lg:text-[40.7347px] text-[30px] leading-[41px] flex-grow text-center'>
                    {Title}
                </h1>
                {edit === true ?
                    <IoIosAddCircleOutline size={49} onClick={handleAddEduction} className={`${add_display} lg:h-[49.93px] md:h-[30.93px] h-[25px]`} />
                    : <></>
                }

            </div>
            <div className='relative w-[100%] mx-9 items-start'>
                {/* <div className={`absolute w-[1px] h-[100%] ${line_color} my-1 z-50 m-2`}></div> */}
                <div className='flex flex-col py-3 justify-between gap-9 w-[100%]'>


                    {
                        Object.values(profileHistory).map((data) => {
                            return (
                                <EducationCards title={data.title} id={data.id} startDate={data.startDate} endDate={data.endDate} description={data.description} cards_bg={cards_bg} edit_display={edit_display} line_color={line_color} duration_display={duration_display} time_display={time_display} skills_display={skills_display} font_weight={font_weight} />
                            )

                        })
                    }
                </div>
            </div>
        </div>
    );
}
