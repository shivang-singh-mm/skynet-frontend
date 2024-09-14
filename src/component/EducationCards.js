import React from 'react';
import { RiPencilFill, RiDeleteBin4Fill } from "react-icons/ri";
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios';


export default function EducationCards({ cards_bg, line_color, duration_display, skills_display, edit_display, time_display, font_weight, startDate, endDate, skills, description, Time, title, id, edit }) {
    const start_date = moment(startDate).format('YYYY-MM-DD');
    const end_date = moment(endDate).format('YYYY-MM-DD');

    Time = start_date + " - " + end_date;
    const dispatch = useDispatch();

    const baseUrl = process.env.REACT_APP_API_URL

    const handledelete = async (id) => {
        const response = await axios.delete(`${baseUrl}/history/delete/${id}`, {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('skyn_token'),
                'Content-Type': 'application/json'
            }
        })
        window.location.reload();
    }



    return (
        <div className='relative w-[90%]  flex flex-col' >
            <div className='flex flex-row items-center'>
                {/* <div class={`w-4 h-4 ${line_color} rounded-full`}></div> */}
                <div className={`flex flex-row w-[90%]  ${cards_bg}  rounded-2xl`}>
                    <div className='relative flex flex-col p-5 gap-1 w-[90%]'>
                        <h5 className={`flex-grow font-inter ${font_weight} text-[21.208px] leading-[20px] flex items-center text-black backdrop-blur-3xl`}>
                            {title}
                        </h5>
                        <h3 className={`h-18 font-inter font-normal md:text-[15px] text-[12px] leading-[23px] text-[#7E7C7C] ${duration_display}`}>{start_date} - {end_date}</h3>
                        <h3 className='font-noto-serif font-medium md:text-[15px] text-[12px]  leading-[19px] flex items-center text-black backdrop-blur-sm'>{description}</h3>
                        <h3 className={`font-noto-serif font-medium md:text-[15px] text-[12px]  leading-[19px] ${skills_display} items-center text-black backdrop-blur-sm`}>{skills}</h3>
                    </div>
                    <div className='flex flex-col items-end w-[80%] p-5'>
                        <div className='flex'>
                            {edit === true ?
                                <>
                                    <RiDeleteBin4Fill size={30} onClick={() => handledelete(id)} />
                                    {/* <RiPencilFill size={30} className={`${edit_display}`} /> */}
                                </>
                                : <></>
                            }
                        </div>
                        {/* <h5 className={` flex-grow font-inter ${font_weight} md:text-[23px] text-[20px] leading-[26px] ${time_display} text-black backdrop-blur-3xl`}>
                            {Time}
                        </h5> */}
                    </div>
                </div>
            </div>
        </div >
    );
}








// import React from 'react';
// import { IoIosAddCircleOutline } from "react-icons/io";
// import { RiPencilFill } from "react-icons/ri";
// import { Outlet, useOutlet, useOutletContext } from 'react-router-dom';

// export default function EducationCards({cards_bg, line_color, duration_display, skills_display, edit_display, font_weight, Name, Duration, skills, Description, Time}) {
//   return (
//     <div className='relative flex flex-col gap-9'>
//         <div className='flex flex-row items-center'>
//             <div class={`w-4 h-4 ${line_color} rounded-full`}></div>
//             <div className={`relative flex flex-col p-5 gap-3   ${cards_bg}  rounded-2xl ml-5`}>
//                 <div className='flex flex-row items-center'>
//                     <h5 className={`flex-grow font-inter ${font_weight} text-[26.208px] leading-[26px] flex items-center text-black backdrop-blur-3xl`}>
//                         {Name}
//                     </h5>
//                     <RiPencilFill size={32} className={`${edit_display}`}/>
//                     <h5 className={`flex-grow font-inter ${font_weight} text-[26.208px] leading-[26px] ${~edit_display} items-center text-black backdrop-blur-3xl`}>
//                         {Time}
//                     </h5>
//                 </div>
//                 <h3 className={`h-18 font-inter font-normal text-[17.92px] leading-[23px] text-[#7E7C7C] ${duration_display}`}>{Duration}</h3>
//             <h3 className='font-noto-serif font-medium text-[19.2px] leading-[19px] flex items-center text-black backdrop-blur-sm'>{Description}</h3>
//             <h3 className={`font-noto-serif font-medium text-[19.2px] leading-[19px] ${skills_display} items-center text-black backdrop-blur-sm`}>{skills}</h3>
//             </div>
//         </div>
//     </div>
//   );
// }
