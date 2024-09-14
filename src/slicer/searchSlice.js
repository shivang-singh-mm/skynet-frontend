import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
  search: [],
  sector: '',
  expirence: '',
  jobtitle: '',
  tag: '',
  status: 'idle',
  error: null,
  message: ''
};

const baseUrl = process.env.REACT_APP_API_URL

export const featchSearch = createAsyncThunk('search/featchSearch', async (name, { getState, dispatch }) => {
  const sector = getState().search.sector;
  const experience = getState().search.expirence;
  const tag = getState().search.tag;
  console.log(tag)

  const user_id = localStorage.getItem('skyn_userId')

  if (name === undefined) {
    name = '';
  }


  const response = await axios.get(`${baseUrl}/get/filter/${user_id}?name=${name}&sector=${sector}&experience=${experience}&tag=${tag}`, {
    headers: {
      'authorization': 'Bearer ' + localStorage.getItem('skyn_token'),
      'Content-Type': 'application/json'
    }
  })
  return response.data;
});


const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSector: (state, action) => {
      if (action.payload === "all") {
        state.sector = '';
      } else {
        state.sector = action.payload;
      }

    },

    setTag: (state, action) => {
      if (action.payload === "all") {
        state.tag = '';
      } else {
        state.tag = action.payload;
      }

    },

    setexpirence: (state, action) => {
      if (action.payload === "any") {
        state.expirence = '';
      } else {
        state.expirence = action.payload;
      }
    },
  },
  extraReducers: (builder) => {

    builder


      // Fetch posts cases
      .addCase(featchSearch.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(featchSearch.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.search = action.payload.body;
      })
      .addCase(featchSearch.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

  }
});

export const { setSector, setexpirence, setTag } = searchSlice.actions;
export default searchSlice.reducer;