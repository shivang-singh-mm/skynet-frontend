import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    followers: [],
    following: [],
    state: 'idel',
    error: null,
    message: '',
}

const baseUrl = process.env.REACT_APP_API_URL

export const fetchFollowers = createAsyncThunk('followers/fetchfollowers', async () => {
    const response = await axios.get('', {

    })
    return response.data;
})

export const fetchFollowing = createAsyncThunk('followers/fetchFollowing', async () => {
    const response = await axios.get('', {

    })
    return response.data;
})


const followersSlice = createSlice({
    name: followers,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(fetchFollowers.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                state.message = '';
            })
            .addCase(fetchFollowers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.followers = action.payload;

            })
            .addCase(fetchFollowers.rejected, (state, action) => {
                state.status = 'failed';
                state.isLoggedIn = false;
            })

            .addCase(fetchFollowing.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                state.message = '';
            })
            .addCase(fetchFollowing.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.following = action.payload;

            })
            .addCase(fetchFollowing.rejected, (state, action) => {
                state.status = 'failed';
                state.isLoggedIn = false;
            })
    }
})

export default followersSlice.reducer;