import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { createPost } from '../slicer/postSlicer';
import { useNavigate } from 'react-router-dom'
import AWS from 'aws-sdk';
import { uploadFile } from 'react-s3';
import { IoIosAddCircleOutline } from "react-icons/io";
import Resizer from 'react-image-file-resizer';

function AddPost() {
  const [file, setFile] = useState(null);
  const [mediaLink, setMediaLink] = useState(null);
  const [caption, setCaption] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);
  const [landmark, setLandmark] = useState('');

  const dispatch = useDispatch();
  const [msg, setButton] = useState('Submit')
  const [image, setImage] = useState('')

  const status = useSelector((state) => state.post.status);
  const error = useSelector((state) => state.post.error);
  const navigate = useNavigate('');

  //AWS LOGIC

  const compressImage = (file, maxSizeMB = 1, callback) => {
    Resizer.imageFileResizer(
      file,
      800, // max width
      800, // max height
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

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    // Changing file state
    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl)
    setFile(file);
  }

  async function uploadFileo() {
    // S3 Bucket Name
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

    // Files Parameters




    // Uploading file to s3


    try {
      setButton('Loading');
      compressImage(file, 1, async (compFile) => {
        const params = {
          Bucket: S3_BUCKET,
          Key: Math.floor(Math.random() * 1000000000) + file.name,
          Body: file,
        };
        var upload = await s3.putObject(params).promise();
        const formData = {
          mediaLink: [`https://skynect.s3.amazonaws.com/${params.Key}`],
          caption,
          description,
          tags,
          landmark,
          userId: localStorage.getItem('skyn_userId'),
        };

        dispatch(createPost(formData));
        navigate('/')
      })




    } catch (error) {
      console.error(error);
      alert("Error uploading file: " + error.message); // Inform user about the error
    }

  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    uploadFileo()


  };


  return (

    <div className='' style={{ marginTop: '60px' }}>
      <div class="container mx-auto p-4 flex items-center justify-center h-full">
        <div class="max-w-[350px] w-full">

          {/* <!-- Form - create your endpoint on Getform and start using this form --> */}
          <form class="w-full flex flex-col justify-center items-center" onSubmit={handleSubmit}>
            <div className='h-[400px] w-[400px]' style={{ overflow: 'hidden' }}>
              <img src={image === '' ? 'https://removal.ai/wp-content/uploads/2021/02/no-img.png' : image} style={{ height: 'auto', width: '100%' }}></img>
            </div>
            <input
              name="caption"
              type="text"
              placeholder="Caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              class="w-full px-3 py-2 mb-2 transition-all border border-gray-200 rounded-md outline-blue-600/50 hover:border-blue-600/30"
            />
            <input
              name="landmark"
              type="text"
              placeholder="Landmark"
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
              class="w-full px-3 py-2 mb-2 transition-all border border-gray-200 rounded-md outline-blue-600/50 hover:border-blue-600/30"
            />
            <div class="upload-container relative flex items-center justify-between w-full">
              <div class="drop-area w-full rounded-md border-2 border-dotted border-gray-200 transition-all hover:border-blue-600/30 text-center">
                <label
                  for="file-input"
                  class="block w-full h-full text-gray-500 p-4 text-sm cursor-pointer">
                  Click to upload file
                </label>
                <input
                  name="file"
                  type="file"
                  id="file-input"
                  accept="image/*"
                  class="hidden"
                  onChange={handleFileInput}
                />
              </div>
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

            <button type="submit" class="w-full mt-2 p-2.5 text-sm font-medium text-white bg-blue-600 rounded-md" onClick={handleSubmit}>{msg}</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddPost