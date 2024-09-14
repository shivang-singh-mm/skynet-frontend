import React from 'react';
import avatar from "../asset/avtar.png";
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { setSector, featchSearch } from "../slicer/searchSlice";

const Explore = ({ activeButton, setActiveButton }) => {
    const dispatch = useDispatch();
    const sector = useSelector((state) => state.search.sector)

    const handleButtonClick = (buttonName) => {
        if (activeButton === buttonName) setActiveButton('')
        else setActiveButton(buttonName);
        dispatch(setSector(buttonName))
        dispatch(featchSearch());
    };
    const location = useLocation()
    return (
        <div className='h-[240px] max-md:hidden pb-3 relative w-[220px] bg-[#95DB9C] shadow-md rounded-lg mt-5' style={{ borderColor: "black", maxWidth: '220' + 'px' }}>

            <h2 className=' font-bold text-base leading-normal mx-5 flex text-black' style={{ paddingTop: "20" + "px", paddingBottom: '10px' }}>Explore</h2>
            <div className='flex flex-col justify-start mx-5'>
                <Link to='/search' className={`${activeButton === 'NETWORK' && location.pathname == '/search' ? 'bg-white' : 'bg-[#95DB9C]'} rounded-xl hover:scale-110 hover:bg-[#F5F5F5]`} style={{ paddingLeft: '5%' }} ><button className='text-[13px] h-[20px] overflow-hidden rounded-xl items-center' onClick={() => handleButtonClick('NETWORK')}>
                    <div className='flex flex-between items-center w-[190px]'>
                        <h3 className="relative  group">Network</h3>
                        <p style={{ color: '#95DB9C', marginLeft: '30%', fontWeight: 'bold' }}>x</p>
                    </div>
                </button></Link>
                <Link to='/search' className={`${activeButton === 'STUDENT' && location.pathname == '/search' ? 'bg-white' : 'bg-[#95DB9C]'} rounded-xl hover:scale-110 hover:bg-[#F5F5F5]`} style={{ paddingLeft: '5%' }} ><button className='text-[13px] overflow-hidden  h-[20px] rounded-xl' onClick={() => handleButtonClick('STUDENT')}>
                    <div className='flex flex-between items-center w-[190px]'>
                        <h3>Student</h3>
                        <p style={{ color: '#95DB9C', marginLeft: '32%', fontWeight: 'bold' }}>x</p>
                    </div>
                </button></Link>
                <Link to='/search' className={`${activeButton === 'BUSINESS' && location.pathname == '/search' ? 'bg-white' : 'bg-[#95DB9C]'} rounded-xl hover:scale-110 hover:bg-[#F5F5F5]`} style={{ paddingLeft: '5%' }} ><button className='text-[13px] h-[20px] overflow-hidden  rounded-xl' onClick={() => handleButtonClick('BUSINESS')}>
                    <div className='flex flex-between items-center w-[190px]'>
                        <h3>Tech Startups</h3>
                        <p style={{ color: '#95DB9C', marginLeft: '22%', fontWeight: 'bold' }}>x</p>
                    </div>
                </button></Link>
                <Link to='/search' className={`${activeButton === 'FREELANCER' && location.pathname == '/search' ? 'bg-white' : 'bg-[#95DB9C]'} rounded-xl hover:scale-110 hover:bg-[#F5F5F5]`} style={{ paddingLeft: '5%' }} ><button className='text-[13px] overflow-hidden  h-[20px] rounded-xl' onClick={() => handleButtonClick('FREELANCER')}>
                    <div className='flex flex-between items-center w-[190px]'>
                        <h3>Freelancers</h3>
                        <p style={{ color: '#95DB9C', marginLeft: '26%', fontWeight: 'bold' }}>x</p>
                    </div>
                </button></Link>
                <Link to='/search' className={`${activeButton === 'SERVICE_PROVIDER' && location.pathname == '/search' ? 'bg-white' : 'bg-[#95DB9C]'} rounded-xl hover:scale-110 hover:bg-[#F5F5F5]`} style={{ paddingLeft: '5%' }} ><button className='text-[13px] overflow-hidden  h-[20px] rounded-xl' onClick={() => handleButtonClick('SERVICE_PROVIDER')}>
                    <div className='flex flex-between items-center w-[190px]'>
                        <h3>Service Providers</h3>
                        <p style={{ color: '#95DB9C', marginLeft: '15%', fontWeight: 'bold' }}>x</p>
                    </div>
                </button></Link>
                <Link to='/search' className={`${activeButton === 'RECRUITER' && location.pathname == '/search' ? 'bg-white' : 'bg-[#95DB9C]'} rounded-xl hover:scale-110 hover:bg-[#F5F5F5]`} style={{ paddingLeft: '5%' }} ><button className='text-[13px] overflow-hidden  h-[20px] rounded-xl' onClick={() => handleButtonClick('RECRUITER')}>
                    <div className='flex flex-between items-center w-[190px]'>
                        <h3>Recruiter</h3>
                        <p style={{ color: '#95DB9C', marginLeft: '30%', fontWeight: 'bold' }}>x</p>
                    </div>
                </button></Link>
                <Link to='/search' className={`${activeButton === 'INVESTOR' && location.pathname == '/search' ? 'bg-white' : 'bg-[#95DB9C]'} rounded-xl hover:scale-110 hover:bg-[#F5F5F5]`} style={{ paddingLeft: '5%' }} ><button className='text-[13px] overflow-hidden  h-[20px] rounded-xl' onClick={() => handleButtonClick('INVESTOR')}>
                    <div className='flex flex-between items-center w-[190px]'>
                        <h3>Investor</h3>
                        <p style={{ color: '#95DB9C', marginLeft: '32%', fontWeight: 'bold' }}>x</p>
                    </div>
                </button></Link>
            </div>
        </div>
    )
}

export default Explore