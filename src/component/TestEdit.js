import React, { useState, useEffect } from 'react'
import { CiSquareRemove } from "react-icons/ci";
import { useSelector, useDispatch } from 'react-redux'
import { CloseBioEdit } from '../slicer/ModelSlicer';
import { fetchUser, updateInfo, updateUser } from '../slicer/profileSlice';
import axios from 'axios';
import AWS from 'aws-sdk';
import { useNavigate } from 'react-router-dom';
import Resizer from 'react-image-file-resizer';
import { IoMdAddCircle } from "react-icons/io";
import { MdCancel } from "react-icons/md";

function TestEdit({ isOpen }) {
  if (!isOpen) return null;

  const dispatch = useDispatch();


  const [summary, setSummary] = useState('')
  const [aspirations, setAspirations] = useState('')
  const [profilePic, setProfilePic] = useState('')
  const [file, setFile] = useState('')
  const [submitButton, setSubmitButton] = useState('Submit')
  const [cancelButton, setCancelButton] = useState('Cancel')
  const [msg, setButton] = useState('');

  const userdata = useSelector((state) => state.profile.profile);
  const status = useSelector((state) => state.auth.status);
  const navigate = useNavigate()


  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    if (userdata) {
      setSummary(userdata.bio || '');
      setAspirations(userdata.aspirations || '');
      setProfilePic(userdata.profilePic || '')
    }
  }, [userdata]);

  const compressImage = (file, maxSizeMB = 1, callback) => {
    Resizer.imageFileResizer(
      file,
      200, // max width
      200, // max height
      'JPEG', // output format
      70, // quality (0-100)
      0, // rotation
      (uri) => {
        callback(uri);
      },
      'blob', // output type
      maxSizeMB * 1024, // max file size in KB
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    setSubmitButton('')
    setCancelButton('')
    setButton('Loading')

    const S3_BUCKET = "skynect";

    // S3 Region
    const REGION = "eu-north-1";

    // S3 Credentials
    AWS.config.update({
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
    });
    const s3 = new AWS.S3({
      params: { Bucket: S3_BUCKET },
      region: REGION,
    });


    try {

      if (file === '') {
        const formData = {
          profilePic,
          bio: summary,
          aspirations,
          userId: localStorage.getItem('skyn_userId'),
        };

        dispatch(updateInfo(formData))
        if (status === 'succeeded') {
          navigate('/profile')
          dispatch(CloseBioEdit())
        }
      }
      else {
        compressImage(file, 1, async (compFile) => {
          const params = {
            Bucket: S3_BUCKET,
            Key: Math.floor(Math.random() * 1000000000) + file.name,
            Body: compFile,
          };
          var upload = await s3.putObject(params).promise();
          const formData = {
            profilePic: `https://skynect.s3.amazonaws.com/${params.Key}`,
            bio: summary,
            aspirations,
            userId: localStorage.getItem('skyn_userId'),
          };

          dispatch(updateInfo(formData))
          if (status === 'succeeded') {
            localStorage.setItem('profile_pic', `https://skynect.s3.amazonaws.com/${params.Key}`)
            navigate('/profile')
            dispatch(CloseBioEdit())
          }
        })
      }

    } catch (error) {
      console.error(error);
      // setUploading(false)
      alert("Error uploading file: " + error.message); // Inform user about the error
    }
  }

  const handlePictureChange = (e) => {
    // e.preventDefault()
    const image = e.target.files[0];
    if (image) {
      // Create a URL for the selected image file
      const imageUrl = URL.createObjectURL(image);
      // Update the state with the new image URL
      setProfilePic(imageUrl);
    }
    setFile(image)
  }

  const handleCancel = () => {
    navigate('/profile')
    window.location.reload()
  }



  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <div className='flex justify-between items-center'>
          <p className='text-2xl font-semibold'>BioEdit</p>
          <CiSquareRemove size={34} onClick={() => dispatch(CloseBioEdit())} />
        </div>
        <div>
          <form onSubmit={handleSubmit} >
            <div className="relative flex items-center justify-center">
              {/* <img src={profilePic} className="rounded-full w-24 h-auto" alt="Profile" /> */}
              <div className='w-[80px] h-[80px] ' style={{ marginTop: '4px', position: 'relative', overflow: 'hidden', borderRadius: '50%' }}>
                <img src={profilePic} alt="profileimage"
                  style={{ display: 'inline', margin: 'auto', height: 'auto', width: '100%' }} />
              </div>

              <label
                htmlFor="file-upload"
                className="absolute top-0 transform translate-x-1/2 -translate-y-1/2 text-blue-500 bg-white rounded-full p-1 cursor-pointer"
              >
                <IoMdAddCircle size={34} className="pointer-events-none" />
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  onChange={handlePictureChange}// Add your file upload handler here
                />
              </label>
            </div>

            <div className='pt-5'>
              <p className='py-3 text-base font-medium'>Tagline :</p>
              <textarea className="w-full rounded-lg border-2 border-black" value={aspirations}
                onChange={(e) => setAspirations(e.target.value)} />

            </div>
            <div className='pt-5'>
              <p className='py-3 text-base font-medium'>Summary :</p>
              <textarea className="w-full rounded-lg border-2 border-black" value={summary}
                onChange={(e) => setSummary(e.target.value)} />
            </div>
            {
              msg === 'Loading'
                ? <><div class="info-msg">
                  <i class="fa fa-info-circle"></i>
                  &nbsp;Give us time to process.
                </div></>
                : <></>}
            {
              msg === 'Error'
                ? <><div class="error-msg">
                  <i class="fa fa-times-circle"></i>
                  Something went wrong.
                </div></>
                : <></>

            }
            <div className='pt-5'>
              <button className='w-full bg-blue-500 text-white py-3 mt-3 rounded-lg' type='submit' >Save</button>
              <button className='w-full bg-red-500 text-white py-3 mt-3 rounded-lg' onClick={() => dispatch(CloseBioEdit())} >Cancel</button>
            </div>
          </form>
        </div>

      </div>
    </div>
  )
}

export default TestEdit