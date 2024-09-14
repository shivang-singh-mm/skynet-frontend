import React, { useEffect } from 'react';
import { IoIosAddCircleOutline } from "react-icons/io";
import EducationCards from './EducationCards';
import TimeLineCards from './TimeLineCompoents';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTimeLine, fetchUserTimeLine } from '../slicer/profileSlice';


export default function TimeLineCardsSection({ Title, line_color = 'bg-[#C6C5C5]', cards_bg = 'bg-[#eeeced]', add_display = 'flex', time_display = 'hidden', duration_display = 'flex', skills_display = 'flex', font_weight = 'font-medium', edit, userId }) {
    // Title, add_display = 'flex', line_color = 'bg-[#C6C5C5]', cards_bg = 'bg-[#eeeced]', edit_display = 'flex', time_display = 'hidden', duration_display = 'flex', skills_display = 'flex', font_weight = 'font-medium', edit, PURPOSE
    const navigate = useNavigate();
    const dispatch = useDispatch();
    var { id } = useParams();

    const timeline = useSelector((state) => state.profile.timeLine)


    useEffect(() => {
        if (id === undefined) id = localStorage.getItem('skyn_userId')
        dispatch(fetchTimeLine(id))
    }, [dispatch])

    return (
        <div className='relative w-[100%] bg-[#FFFFFF] rounded-md shadow-lg bg-opacity-40 pb-24' style={{ backgroundColor: 'white' }}>
            <div className='flex flex-row p-10 items-center'>
                <h1 className='font-david-libre font-normal lg:text-[28.7347px] text-[20px] leading-[28px] flex-grow text-center'>
                    {Title}
                </h1>

                {edit === true ?
                    <IoIosAddCircleOutline size={38} className="flex lg:h-[49.93px] md:h-[30.93px] h-[25px]" onClick={() => navigate('/addtimeline')} />
                    : <></>
                }
            </div>
            <div className='relative flex flex-row mx-9 items-start'>

                {/* <div className='flex flex-col py-3 justify-between items-start gap-9'> */}
                <div class="lg:p-7 md:p-5 p-1">
                    <div className={`absolute w-[3px] h-[70%] bg-gray-700  lg:m-2 md:m-2 m-0.001`} style={{ backgroundColor: 'rgb(229 231 235)' }}></div>
                    <ol class="relative">


                        {
                            Object.values(timeline).map((data) => {
                                return (
                                    // <></>
                                    <TimeLineCards title={data.title} id={data.id} startDate={data.startDate} endDate={data.endDate} description={data.description} cards_bg={cards_bg} add_display={add_display} duration_display={duration_display} time_display={time_display} skills_display={skills_display} font_weight={font_weight} edit={edit} />
                                )
                            })
                        }
                    </ol>
                </div>

                {/* <EducationCards cards_bg={cards_bg} edit_display={edit_display} line_color={line_color} duration_display={duration_display} time_display={time_display} skills_display={skills_display} font_weight={font_weight} Name='Funded' Duration='2021-2025' Description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt' skills='Java, Node.js, SQL, Docker +2 Skills' Time=' NOVEMBER 2023' />
                    <EducationCards cards_bg={cards_bg} edit_display={edit_display} line_color={line_color} duration_display={duration_display} time_display={time_display} skills_display={skills_display} font_weight={font_weight} Name='Founded' Duration='2021-2025' Description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt' skills='Java, Node.js, SQL, Docker +2 Skills' Time=' JULY 2023' /> */}
                {/* </div> */}
            </div>
        </div >
    );
}
