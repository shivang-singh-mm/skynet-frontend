import "./App.css";
import { useSelector, useDispatch } from 'react-redux';
import { CheckUser } from './slicer/authSlicer';

import Navbar from "./component/Navbar";
import Homepage from "./pages/HomePage";
import Register from "./pages/Register";
import SearchPage from "./pages/SearchPage"
import ExplorePage from "./pages/ExplorePage"
import RecommendationPage from "./pages/RecommendationPage"
import ProfilePage from './pages/ProfilePage'
import ConversationPage from './pages/ConversationPage'

import { useState, useEffect } from "react";

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  BrowserRouter,
  Routes
} from 'react-router-dom'
import EducationAddForm from "./component/EducationAddForm";
import AddPost from "./component/AddPost";
// import BioEdit from "./component/BioEdit";
import AddTimeline from "./component/AddTimeline";
import GrowNetworkPage from "./pages/GrowNetworkPage";
import PeopleViewed from "./pages/PeopleViewed";
import ChatArea from "./component/ChatArea";


import ProtectedRoute from "./ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UserPage";

import EditMe from "./component/EditMe";
import Profile from "./component/Profile";
import FollowersPage from "./pages/FollowersPage";
// import FollowingPage from "./pages/FollowingPage";
import FollowingPage from "./pages/FollowingPage";
import NotificationPage from "./pages/NotificationPage";
import AllPost from "./pages/AllPost";



function App() {
  const [activeButton, setActiveButton] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(CheckUser());
  }, [dispatch]);





  const isAuthenticated = useSelector((state) => state.auth.isLoggedIn);


  return (
    <BrowserRouter>
       {isAuthenticated && (
        <Navbar activeButton={activeButton} setActiveButton={setActiveButton} />
      )}
      <Routes>
        <Route path='/register' element={<Register />}></Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/chat/:userId"  element={<ConversationPage />} />
        <Route path="/chat/:userId/:chatRoomId" element={<ConversationPage />} />

        {/* <Route path="/chat/:chatId"  element={<ChatArea />} /> */}
        <Route path='/' element={
          <ProtectedRoute>
          </ProtectedRoute>
        }>

          <Route index element={
            <ProtectedRoute >
              <Homepage activeButton={activeButton} setActiveButton={setActiveButton} />
            </ProtectedRoute>
          } />

          <Route path='/search' element={
            <ProtectedRoute >
              <SearchPage />
            </ProtectedRoute>
          }></Route>
          <Route path='/recommendation' element={
            <ProtectedRoute >
              <RecommendationPage />
            </ProtectedRoute>
          }></Route>

          <Route path="/profile" element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } />
          <Route path="/add/education" element={
            <ProtectedRoute>
              <EducationAddForm PURPOSE='STUDENT' />
            </ProtectedRoute>
          } />
          <Route path="/add/experience" element={
            <ProtectedRoute>
              <EducationAddForm PURPOSE='FREELANCER' />
            </ProtectedRoute>
          } />
          <Route path="/post/:userId" element={
            <ProtectedRoute>
              <AllPost />
            </ProtectedRoute>
          } />
          <Route path="/addpost" element={
            <ProtectedRoute>
              <AddPost />
            </ProtectedRoute>
          } />
          <Route path="/notification" element={
            <ProtectedRoute >
              <NotificationPage />
            </ProtectedRoute>
          } />
          <Route path="/addtimeline" element={
            <ProtectedRoute>
              <AddTimeline />
            </ProtectedRoute>
          } />
          <Route path="/grownetwork" element={
            <ProtectedRoute>
              <GrowNetworkPage />
            </ProtectedRoute>
          } />
          <Route path='/following/:userId' element={
            <ProtectedRoute >
              <FollowingPage />
            </ProtectedRoute>
          }></Route>
          <Route path='/followers/:userId' element={
            <ProtectedRoute >
              <FollowersPage />
              {/* <RecommendationPage /> */}
            </ProtectedRoute>
          }></Route>
          <Route path="/view" element={
            <ProtectedRoute>
              <PeopleViewed />
            </ProtectedRoute>} />
          <Route path="/user/:id" element={
            <ProtectedRoute>
              <UserPage />
            </ProtectedRoute>
          } />

        </Route>
      </Routes>
    </BrowserRouter>
  )

}

export default App;



// <Route path='/' element={<Navbar />}>
//   <Route index element={<Homepage/>}></Route>
//   <Route path='/search' element={<SearchPage/>}></Route>
// </Route>

// <div className="w-screen h-screen flex flex-col overflow-x-hidden">
//   <Navbar/>
//   <Homepage/>
// </div>
// <div className='w-screen h-screen flex flex-col overflow-x-hidden'>
//     <Register/>
// </div>

// <div className="absolute w-screen h-screen flex flex-col overflow-x-hidden">
//   <Navbar/>
//   <SearchPage/>
// </div>