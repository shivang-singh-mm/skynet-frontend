import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser, updateUser } from '../slicer/profileSlice';
import { useNavigate } from 'react-router-dom';
import { CloseEditMe } from '../slicer/ModelSlicer';
import { MdCancel } from "react-icons/md";
import { cities } from './Cities';
import { tagsConst } from './Tags';


function EditMe({ isOpen }) {
  if (!isOpen) return null;

  // State hooks
  const [githubURL, setGithubURL] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [purpose, setPurpose] = useState('');
  const [city, setCity] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [aboutJobTitle, setAboutJobTitle] = useState('');
  const [linkedInURL, setLinkedInURL] = useState('');
  const [experience, setExperience] = useState('');
  const [warn, setWarn] = useState(true);

  const [Tags, setTags] = useState([])


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userdata = useSelector((state) => state.profile.profile);
  const status = useSelector((state) => state.profile.update_status);

  function validateGitHubUsernameURL(url) {
    const githubRegex = /^https:\/\/github\.com\/[A-Za-z0-9-]+(\/.*)?(\?.*)?$/;
    return githubRegex.test(url);
  }

  function validateLinkedInUsernameURL(url) {
    const linkedInRegex = /^https:\/\/(www\.)?linkedin\.com\/in\/[A-Za-z0-9_-]+(\/.*)?(\?.*)?$/;
    return linkedInRegex.test(url);
  }

  // Fetch user data on mount and initialize form fields
  useEffect(() => {
    dispatch(fetchUser());

  }, [dispatch]);

  useEffect(() => {
    if (status === 'succeeded') {
      navigate('/profile');
      dispatch(CloseEditMe())
    }
  })

  useEffect(() => {
    if (userdata) {
      setGithubURL(userdata.githubURL || '');
      setCompanyId(userdata.companyId || '');
      setPurpose(userdata.purpose || '');
      setCity(userdata.city || '');
      setJobTitle(userdata.jobTitle || '');
      setAboutJobTitle(userdata.aboutJobTitle || '');
      setLinkedInURL(userdata.linkedInURL || '');
      setExperience(userdata.experience || '');
      setTags(userdata.tags || '')
    }
  }, [userdata]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (githubURL != '' && !validateGitHubUsernameURL(githubURL)) { console.log("good"), setWarn(false); }
    else if (linkedInURL != '' && !validateLinkedInUsernameURL(linkedInURL)) setWarn(false);
    else if (experience != '' && experience < 0) setWarn(false);
    else {
      const formData = {
        userId: localStorage.getItem('skyn_userId'),
        githubURL,
        companyId,
        city,
        jobTitle,
        linkedInURL,
        purpose,
        experience,
        aboutJobTitle,
        tags: Tags
      };
      setWarn(true)
      dispatch(updateUser(formData));
    }
  };

  const addTags = (text) => {
    setTags((prevTags) => {
      // Check if the tag already exists in the previous state
      if (prevTags != [] && prevTags != "" && !prevTags.some(tag => tag === text)) {
        const newTag = text;
        return [...prevTags, newTag];
      }
      else if (prevTags.length === 0 || prevTags === "") {
        const newTag = text;
        return [...prevTags, newTag]
      }
      return prevTags; // Return the existing tags if the tag already exists
    });
  };

  const removeTags = (text) => {
    setTags(Tags.filter(task => task !== text));
  }

  const Tags_list = [
    'study',
    'open for work',
    'open for newtork',
    'Creativity',
    'TimeManagement',
    'CriticalThinking',
    'CommunicationSkills',
    'ProblemSolving',
    'Teamwork',
    'Adaptability',
    'ResearchSkills'
  ]

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50'>
      <div className='bg-white p-6 rounded-lg shadow-lg max-w-sm w-full'>
        <form onSubmit={handleSubmit}>
          <div className='border-b-2 mb-7 border-black'>
            <h1 className='text-2xl font-semibold'>Bio Edit</h1>
          </div>

          <input
            className="w-full border-2 border-black rounded-lg"
            type='text'
            name='githubURL'
            value={githubURL}
            onChange={(e) => setGithubURL(e.target.value)}
            placeholder='Enter your GitHub URL'
          />
          <select
            name='purpose'
            className="w-full my-1 border-2 border-black rounded-lg"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
          >
            <option value="" disabled>
              Choose Occupation
            </option>
            <option value="STUDENT">Student</option>
            <option value="ENTREPRENEUR">Entrepreneur</option>
            <option value="STARTUP">Startup</option>
            <option value="LEGALITIES">Legalities</option>
            <option value="FREELANCER">Influencer</option>
            <option value="EMPLOYEE">Employee</option>
            <option value="RECRUITER">Recruiter</option>
            <option value="INVESTOR">Investor</option>
            <option value="NETWORK">Marketing</option>
          </select>
          <select
            className="w-full my-1 border-2 border-black rounded-lg"
            type='text'
            name='city'
            placeholder='Enter your city'
            value={city}
            onChange={(e) => setCity(e.target.value)}
          >
            <option value="" disabled style={{ color: 'grey' }}>
              Choose City
            </option>
            {cities.map((option, index) => (
              <option key={index} value={option} >{option}</option>
            ))}
          </select>
          <input
            className="w-full my-1 border-2 border-black rounded-lg"
            type='text'
            name='city'
            placeholder='Enter your Linkedin url'
            value={linkedInURL}
            onChange={(e) => setLinkedInURL(e.target.value)}
          />
          <input
            className="w-full my-1 border-2 border-black rounded-lg"
            type='text'
            name='jobTitle'
            placeholder='Enter your job title'
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
          <div className='pt-3'>
            <p className='py-3 text-base font-medium'>Tags :</p>
            <div className="w-full min-h-[150px] max-h-auto  rounded-lg border-2 border-black">
              <div className='flex flex-wrap'>
                {
                  Tags.length > 0
                    ? Tags.map((data) => {
                      console.log(data.texts)
                      return (
                        <div className="px-2 py-1 bg-gray-200 m-1 flex justify-center items-center gap-2" >
                          <p className=" text-sm">{data}</p>
                          <MdCancel className="" onClick={() => removeTags(data)} />
                        </div>
                      )
                    })
                    : <></>
                }
              </div>
            </div>
            {
              Tags.length >= 6
                ? <p style={{ color: "red" }}>Cannot add more than five tags.</p>
                : <></>
            }
            <div className="flex flex-row mt-3">
              <select
                className="w-[150px] py-2 bg-white border border-gray-300 rounded-lg focus:outline-none"
                onChange={(e) => addTags(e.target.value)}
              >
                <option value="" disabled selected>General Tags</option>
                {
                  tagsConst[purpose]?.map((data) => (
                    <option key={data} value={data}>#{data}</option>
                  ))
                }
                {
                  tagsConst['Networking and Collaboration Hashtags']?.map((data) => (
                    <option key={data} value={data}>#{data}</option>
                  ))
                }
                {
                  tagsConst['Location-specific']?.map((data) => (
                    <option key={data} value={data}>#{data}</option>
                  ))
                }
              </select>
              <select
                className="w-[150px] py-2 bg-white border border-gray-300 rounded-lg focus:outline-none"
                onChange={(e) => addTags(e.target.value)}
              >
                <option value="" disabled selected>Sector Tags</option>
                {
                  tagsConst['Sector-Specific Hashtags']?.map((data) => (
                    <option key={data} value={data}>#{data}</option>
                  ))
                }

              </select>
            </div>
            {/* <div className="flex flex-wrap mt-3">
              {
                tagsConst[purpose]?.map((data) => {

                  return (
                    <div className="px-2 py-1 bg-gray-200 m-1 " onClick={() => addTags(data)} >
                      <p className=" text-sm">{data}</p>
                    </div>
                  )
                })
              }
            </div> */}
          </div>
          <input
            className="w-full my-1 border-2 border-black rounded-lg"
            type='number'
            name='experience'
            placeholder='Enter your experience'
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          />
          {warn == false && <div class="warning-msg">
            <i class="fa fa-warning"></i>
            Please input correct values.
          </div>}
          <div className='flex justify-between items-center mt-3'>
            <button type='submit' className='px-3 py-1 bg-blue-500 rounded-lg text-white'>Save</button>
            <button
              className='px-3 py-1 bg-red-500 rounded-lg text-white'
              type='button'
              onClick={() => dispatch(CloseEditMe())}
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default EditMe;
