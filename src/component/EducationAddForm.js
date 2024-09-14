import React, { useState, useEffect } from 'react'
import './css/EducationAddForm.css'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { CreatHistory } from '../slicer/profileSlice'
import profileSlice, { resetStatus } from '../slicer/profileSlice'

function EducationAddForm(PURPOSE) {

  const dispatch = useDispatch();
  const navigate = useNavigate('');
  const userId = localStorage.getItem('skyn_userId')


  const status_update = useSelector((state) => state.profile.update_status);
  const error = useSelector((state) => state.profile.error);
  const [showError, setShowError] = useState(false)

  const [formData, setFormData] = useState({
    userId: userId,
    startDate: '',
    endDate: '',
    title: '',
    description: '',
    purpose: PURPOSE.PURPOSE,
  });

  useEffect(() => {
    if (status_update === 'succeeded') {
      dispatch(resetStatus())
      navigate('/profile')
      // window.location.reload();
    }
  }, [status_update, dispatch])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(CreatHistory(formData))
  };

  const handleCancel = () => {
    setFormData({
      startDate: '',
      endDate: '',
      title: '',
      description: '',
      purpose: '',
    });

    navigate('/profile')
  };

  return (
    <div>
      <div className='ed-container'>
        <>

          <div class="container mx-auto p-4 flex items-center justify-center h-full">
            <div class="max-w-[350px] w-full">
              <h1 style={{ marginBottom: "30px", fontSize: '30px' }}>Add Details</h1>
              {/* <!-- Form - create your endpoint on Getform and start using this form --> */}
              <form class="w-full flex flex-col justify-center" action="your-getform-endpoint" method="POST" enctype="multipart/form-data">
                <div class="flex">
                  <label className=''>
                    <span>startDate</span>
                    <input required placeholder="" type="date" class="ed-input " name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      className='border border-gray-200'
                    />
                  </label>

                  <label>
                    <span>endDate</span>
                    <input required={true} placeholder="" type="date" class="ed-input" name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      className='border border-gray-200'
                    />
                  </label>
                </div>
                <br />
                <input
                  name="title"
                  type="text"
                  placeholder="Title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  class="w-full px-3 py-2 mb-2 transition-all border border-gray-200 rounded-md outline-blue-600/50 hover:border-blue-600/30"
                />

                <textarea
                  name="description"
                  id=""
                  cols="30"
                  rows="5"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  class="w-full px-3 py-2 mb-2 resize-none transition-all border border-gray-200 rounded-md outline-blue-600/50 hover:border-blue-600/30"
                ></textarea>
                <button type="submit" class="w-full mt-2 p-2.5 text-sm font-medium text-white bg-blue-600 rounded-md" onClick={handleSubmit}>Submit</button>
                {showError === true ? <p style={{ color: 'red' }}>{error ? error.message : 'Unable to create histroy'}</p> : <></>}
              </form>

            </div>
          </div>
        </>

      </div>
    </div>
  )
}

export default EducationAddForm