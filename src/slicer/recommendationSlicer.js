import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  recommendation: [],
  sector: '',
  expirence: '',
  jobtitle: '',
  status: 'idle',
  error: null,
  message: ''
};

const baseUrl = process.env.REACT_APP_API_URL

export const featchRecommendation = createAsyncThunk('search/featchSuggestion', async () => {
  const user_id = localStorage.getItem('skyn_userId')

  const response = await axios.get(`${baseUrl}/get/recommendation/${user_id}`, {
    headers: {
      'authorization': 'Bearer ' + localStorage.getItem('skyn_token'),
      'Content-Type': 'application/json'
    }
  })
  return response.data;
});


const recommendationSlice = createSlice({
  name: 'recommendation',
  initialState,
  reducers: {
    setSector: (state, action) => {
      if (action.payload === "all") {
        state.sector = '';
      } else {
        state.sector = action.payload;
      }

    },

    setexpirence: (state, action) => {
      if (action.payload === "any") {
        state.expirence = '';
      } else {
        state.expirence = action.payload;
      }
    }
  },
  extraReducers: (builder) => {

    builder


      // Fetch posts cases
      .addCase(featchRecommendation.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(featchRecommendation.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.recommendation = action.payload.body;
      })
      .addCase(featchRecommendation.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

  }
});
export const { setSector, setexpirence } = recommendationSlice.actions;
export default recommendationSlice.reducer;