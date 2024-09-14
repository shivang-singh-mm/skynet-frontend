import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    views: [],
    status: 'idel',
    error: null,
    message: '',
}

const baseUrl = process.env.REACT_APP_API_URL 

export const fetchView = createAsyncThunk('profileView/fetchView', async () => {
    const email = localStorage.getItem('skyn_email')

    const response = await axios.get(`${baseUrl}/profile/view/get/${email}`, {
        headers: {
            'authorization': 'Bearer ' + localStorage.getItem('skyn_token'),
            'Content-Type': 'application/json'
        }
    })
    return response.data;
})

export const CreatView = createAsyncThunk('profileView/CreatView', async (viewData) => {
    const response = await axios.post(`${baseUrl}/profile/view/create`, viewData, {
        headers: {
            'authorization': 'Bearer ' + localStorage.getItem('skyn_token'),
            'Content-Type': 'application/json'
        }
    })

    return response.data;
})

const profileViewSlice = createSlice({
    name: 'profileview',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(fetchView.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(fetchView.fulfilled, (state, action) => {
                state.status = 'fullfield'
                state.views = action.payload.body;
            })
            .addCase(fetchView.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            .addCase(CreatView.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(CreatView.fulfilled, (state) => {
                state.status = 'fullfield'
            })
            .addCase(CreatView.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })


    }
})


export default profileViewSlice.reducer;