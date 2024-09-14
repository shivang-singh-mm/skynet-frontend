import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    suggestions: [],
    status: 'idle',
    error: null,
    message: ''
};

const baseUrl = process.env.REACT_APP_API_URL 

export const featchSuggestion = createAsyncThunk('search/featchSuggestion', async () => {
    const user_id = localStorage.getItem('skyn_userId')

    const response = await axios.get(`${baseUrl}/get/recommendation/${user_id}`, {
        headers: {
            'authorization': 'Bearer ' + localStorage.getItem('skyn_token'),
            'Content-Type': 'application/json'
        }
    })
    return response.data;
});


const SuggestionSlice = createSlice({
    name: 'suggestion',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {

        builder


            // Fetch posts cases
            .addCase(featchSuggestion.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(featchSuggestion.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.suggestions = action.payload.body;
            })
            .addCase(featchSuggestion.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

    }
});

export default SuggestionSlice.reducer;