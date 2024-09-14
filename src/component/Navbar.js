import React, { useEffect, useState, useRef } from "react";
import logo from "../asset/logo.jpg";
import { Link } from "react-router-dom";
import { MdOutlineSearch } from "react-icons/md";
import { CiHome } from "react-icons/ci";
import { IoSettingsOutline, IoNotificationsOutline } from "react-icons/io5";
import { MdOutlineChatBubbleOutline } from "react-icons/md";
import avatar from "../asset/avtar.png";
import { Outlet, useLocation } from "react-router-dom";
import { CiMenuFries } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import { useSelector, useDispatch } from 'react-redux'
import { featchSearch } from "../slicer/searchSlice";
import { FaBell, FaHome } from "react-icons/fa";
import { IoChatbox } from "react-icons/io5";

const Navbar = ({ activeButton, setActiveButton }) => {
  const location = useLocation();
  const profile = useSelector((state) => state.profile.profile);
  const [navOpen, setNavOpen] = useState(false);

  const dispatch = useDispatch();
  const prevLocation = useRef(location.pathname);

  const picture = localStorage.getItem('profile_pic')


  const handleSearchChange = (name) => {
    dispatch(featchSearch(name))
  }

  useEffect(() => {
    dispatch(featchSearch());
  }, [dispatch])


  let NavBg;
  switch (location.pathname) {
    case "/search":
      NavBg = "bg-[#95DB9C]";
      break;
    case "/view":
      NavBg = "bg-[#FFEBA6]"
      break;
    case "/recommendation":
      NavBg = "bg-[#C0FCF8]"
      break;
    default:
      NavBg = "bg-[#77C6FF]";
      break;
  }
  return (
    <div className="w-screen h-0.3em flex flex-col overflow-x-hidden bg-[#F5F5F5]"
      style={{ fontFamily: 'Source Sans Pro' }}
    >

      <div className={`flex justify-between items-center shadow-md w-full h-[70px] py-1  ${NavBg} fixed`}
        style={{ filter: 'drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.25))', overflow: 'visible', zIndex: '2' }}
      >

        {<div className="flex flex-row md:gap-9 gap-2 justify-start px-1 md:mx-3 mx-1 py-4">
          <Link to="/" className="py-7">
            {/* <img src={logo} alt="logo" margin="2px" width="55.55px" height="55px" */}
            <img
              src={logo}
              alt="Skynect Logo"
              className="logo"
              style={{
                height: 55 + "px",
                width: 60 + "px",
                marginTop: 2 + "px",
                borderRadius: 10 + "px",
              }}
            />
            {/* className="flex justify-center items-center rounded-l-md shadow-md rounded-md" */}
            {/* /> */}
          </Link>

          <Link to="/search" className="py-3">
            <div className="flex gap-x-0 py-5 relative items-center">
              <div className="bg-[#F3EDF7] flex-shrink-0 w-[20%] h-[52px] flex justify-center items-center rounded-l-md lg:shadow-md text-2xl"
                style={{ borderRightColor: "black", borderRightWidth: '1px' }}
              >
                <MdOutlineSearch />
              </div>
              <input
                type="text"
                className="bg-[#F3EDF7] flex-shrink lg:w-[25vw] z-10 h-[52px] rounded-r-md lg:shadow-md"
                name="email"
                style={{ borderColor: '#F3EDF7' }}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>
          </Link>
        </div>}

        <div>
          <div
            className="lg:hidden flex justify-center items-center p-2 rounded-lg mr-0 md:hidden cursor-pointer  hover:bg-slate-400 duration-500"
            onClick={() => setNavOpen(!navOpen)}
          >
            {navOpen ? <RxCross2 /> : <CiMenuFries />}
          </div>
        </div>

        <nav >
          <ul className="max-lg:hidden flex flex-row justify-end gap-x-14  text-sm" style={{ marginRight: "10" + "%" }}>
            <li>
              <Link
                to="/"
                className="flex flex-col justify-center items-center"
              >
                <FaHome size={30} />
                <p className="font-normal text-sm pt-1">Home</p>
              </Link>
            </li>
            <li>
              <Link
                to="/notification"
                className="flex flex-col text-sm justify-center items-center"
              >
                <FaBell size={30} />
                <p className="font-normal text-sm pt-1">Notification</p>
              </Link>
            </li>
            <li>
              <Link
                to={`/chat/${localStorage.getItem("skyn_userId")}`}
                className="flex flex-col justify-center items-center"
              >
                <IoChatbox size={30} />
                <p className="font-normal text-sm pt-1">Message</p>
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className="flex flex-col justify-center items-center"
              >
                <div className='w-[38px] h-[38px] ' style={{ position: 'relative', overflow: 'hidden', borderRadius: '50%' }}>
                  <img src={picture} alt="profileimage"
                    style={{ display: 'inline', margin: 'auto', height: 'auto', width: '100%' }} />
                </div>
                <p className="font-normal text-sm pt-1">Profile</p>
              </Link>
            </li>
          </ul>
        </nav>

      </div>
      {/* Mobile Navigation */}
      {navOpen && (
        <div className={`md:hidden flex items-center relative z-100 justify-around ${NavBg} duration-1000 top-0 w-full h-[80px] pb-2 ${navOpen ? "left-0" : "left-[-100%]"}`}
          style={{ zIndex: '3' }}
        >

          <div className={`gap-12 text-xl flex justify-between m-4 mt-6`}>
            <Link to="/" onClick={() => setNavOpen(!navOpen)}>
              <FaHome size={30} />
            </Link>
            <Link to="/setting" onClick={() => setNavOpen(!navOpen)}>
              <FaBell size={30} />
            </Link>
            <Link to="/chat" onClick={() => setNavOpen(!navOpen)}>
              <IoChatbox size={30} />
            </Link>
            <Link
              to="/profile"
              className="flex flex-col justify-center items-center mb-2"
              onClick={() => setNavOpen(!navOpen)}
            >
              <div className='w-[38px] h-[38px] ' style={{ position: 'relative', overflow: 'hidden', borderRadius: '50%' }}>
                <img src={picture} alt="profileimage"
                  style={{ display: 'inline', margin: 'auto', height: 'auto', width: '100%' }} />
              </div>
            </Link>
          </div>
          <div
            className="lg:hidden flex flex-row-reverse justify-between items-center m-4 rounded-full bg-slate-100 hover:bg-slate-500 duration-500 cursor-pointer"
            onClick={() => setNavOpen(!navOpen)}
          >
            {navOpen ? <RxCross2 className="h-[30px] w-[30px]" /> : <CiMenuFries />}
          </div>
        </div>
      )}

      <Outlet context={{ activeButton, setActiveButton }} />
    </div>
  );
};

export default Navbar;
