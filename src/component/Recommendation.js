import React from 'react'
import avatar from "../asset/avtar.png";
import ProfileSection from '../component/ProfileSection'

const Post = () => {
  return (
    <div className='relative w-[60vw] h-[786px] bg-[#EDEDED40] rounded-md shadow-md bg-opacity-40'>
      <div className='flex flex-col justify-around mx-10 p-10  gap-10'>
        {/* <ProfileSection profileImage={avatar} Name='Ronak Sharmaa' Job='Enterpreneur' Post='CEO of amazon' Skills='React || HTML || CSS ' />
        <ProfileSection profileImage={avatar} Name='Shrishti Singh' Job='Enterpreneur' Post='CEO of google' Skills='React || Next || Tailwind' />
        <ProfileSection profileImage={avatar} Name='Avinash Tiwari' Job='Enterpreneur' Post='Investor for top firms' Skills='Vue' />
        <ProfileSection profileImage={avatar} Name='Shivang Singh' Job='Enterpreneur' Post='Co-founder of BioRoid ' Skills='Angular || HTML' />
        <ProfileSection profileImage={avatar} Name='Shalini Singh' Job='Enterpreneur' Post='Co-founder of meta' Skills='Wordpress || php' /> */}
      </div>
    </div>
  )
}

export default Post
