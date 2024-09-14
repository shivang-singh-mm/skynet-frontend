import React from 'react'
import { FaEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import EditMe from './EditMe';
import { useSelector, useDispatch } from 'react-redux';
import { OpenEditMe, CloseEditMe } from '../slicer/ModelSlicer';
import { CiHashtag } from "react-icons/ci";

function AboutMe({ add_display = 'flex', aboutJobTitle, aboutYou, city, email, experience, githubURL, jobTitle, linkedInURL, phoneCode, phone, purpose, edit, tags }) {
    const navigate = useNavigate('')
    const dispatch = useDispatch('')

    const isEditMeOpen = useSelector((state) => state.model.isEditMeModelOpen);

    return (
        <div>
            <div className='relative w-[100%] bg-[#FFFFFF] rounded-md shadow-md bg-opacity-40 pb-24' style={{ backgroundColor: 'white' }}>
                <div className='flex flex-row p-10 items-center'>
                    <h1 className='font-david-libre font-normal text-[25.7347px] leading-[25px] flex-grow text-center'>
                        Personal Details
                    </h1>
                    {edit === true ?
                        <FaEdit size={30} className={`${add_display} lg:h-[30.93px] md:h-[19.93px] h-[16px]`} onClick={() => dispatch(OpenEditMe())} />
                        : <></>
                    }

                </div>
                <EditMe isOpen={isEditMeOpen} />
                <div class="grid lg:grid-cols-2 grid-cols-1 gap-[25px] pt-6">
                    <div>
                        {/* <h5 class="text-xl font-semibold">Personal Details :</h5> */}
                        <div class="mx-10">
                            <div class="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-mail fea icon-ex-md text-slate-400 mr-3">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                    <polyline points="22,6 12,13 2,6"></polyline>
                                </svg>
                                <div class="flex-1">
                                    <h6 class="text-indigo-600 dark:text-white font-medium mb-0">Email :</h6>
                                    <p class="text-slate-400">{email}</p>
                                </div>
                            </div>
                            <div class="flex items-center mt-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bookmark fea icon-ex-md text-slate-400 mr-3">
                                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                                </svg>
                                <div class="flex-1">
                                    <h6 class="text-indigo-600 dark:text-white font-medium mb-0">Sector :</h6>
                                    <p class="text-slate-400">{purpose}</p>
                                </div>
                            </div>
                            <div class="flex items-center mt-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-italic fea icon-ex-md text-slate-400 mr-3">
                                    <line x1="19" y1="4" x2="10" y2="4"></line>
                                    <line x1="14" y1="20" x2="5" y2="20"></line>
                                    <line x1="15" y1="4" x2="9" y2="20"></line>
                                </svg>
                                <div class="flex-1">
                                    <h6 class="text-indigo-600 dark:text-white font-medium mb-0">Experience :</h6>
                                    <p class="text-slate-400">{experience}</p>
                                </div>
                            </div>
                            <div class="flex items-center mt-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-globe fea icon-ex-md text-slate-400 mr-3">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="2" y1="12" x2="22" y2="12"></line>
                                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                                </svg>
                                <div class="flex-1">
                                    <h6 class="text-indigo-600 dark:text-white font-medium mb-0">Github :</h6>
                                    <p class="text-slate-400">{githubURL}</p>
                                </div>
                            </div>
                            <div class="flex mt-3">
                                <CiHashtag size={25} color=' rgb(148 163 184)' strokeWidth={1} />
                                <div class="flex-1 px-3">
                                    <h6 class="text-indigo-600 dark:text-white font-medium mb-0">Tags :</h6>
                                    <p class="text-slate-400">{
                                        tags ? Object.values(tags).map((data) => {
                                            return (<>{data}<br /></>)
                                        })
                                            : <></>
                                    }</p>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div class="mx-10">
                        <div class="flex items-center">
                            <svg width="25" height="25" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" class="feather feather-map-pin fea icon-ex-md text-slate-400 mr-3">
                                <defs>
                                    <style>{".cls-1{fill:rgb(148 163 184)}"}</style>
                                </defs>
                                <title />
                                <path className="cls-1" d="M28,8H21V6a2,2,0,0,0-2-2H13a2,2,0,0,0-2,2V8H4a2,2,0,0,0-2,2V26a2,2,0,0,0,2,2H28a2,2,0,0,0,2-2V10A2,2,0,0,0,28,8ZM13,6h6V8H13Zm15,4v9H4V10ZM4,26V21H28v5Z" />
                                <path className="cls-1" d="M15,18h2a1,1,0,0,0,0-2H15a1,1,0,0,0,0,2Z" />
                            </svg>
                            <div class="flex-1">
                                <h6 class="text-indigo-600 dark:text-white font-medium mb-0">Job Title :</h6>
                                <p class="text-slate-400 mb-0">{jobTitle}</p>
                            </div>
                        </div>
                        <div class="flex items-center mt-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-map-pin fea icon-ex-md text-slate-400 mr-3">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                            <div class="flex-1">
                                <h6 class="text-indigo-600 dark:text-white font-medium mb-0">Location :</h6>
                                <p class="text-slate-400">{city}</p>
                            </div>
                        </div>
                        <div class="flex items-center mt-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-phone fea icon-ex-md text-slate-400 mr-3">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                            </svg>
                            <div class="flex-1">
                                <h6 class="text-indigo-600 dark:text-white font-medium mb-0">Phone No :</h6>
                                <p class="text-slate-400">{phoneCode} {phone}</p>
                            </div>
                        </div>
                        <div class="flex items-center mt-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-globe fea icon-ex-md text-slate-400 mr-3">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="2" y1="12" x2="22" y2="12"></line>
                                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                            </svg>
                            <div class="flex-1">
                                <h6 class="text-indigo-600 dark:text-white font-medium mb-0">LinkedIn :</h6>
                                <p class="text-slate-400">{linkedInURL}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutMe