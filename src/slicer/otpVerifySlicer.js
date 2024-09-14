import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    otp: '',
    status: 'idel',
    messsage: '',
    error: null
}

const baseUrl = process.env.REACT_APP_API_URL 

export const sendOtp = createAsyncThunk('otp/sendotp', async (otpcode) => {
    const response = await axios.post('', {
        headers: {
            'authorization': 'Bearer ' + localStorage.getItem('skyn_token'),
            'Content-Type': 'application/json'
        }
    })

    return response.data;
})


const otpSlicer = createSlice({
    name: 'otpverify',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(sendOtp.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(sendOtp.fulfilled, (state, action) => {
                state.status = 'succed';
                state.otp = action.payload;
            })
            .addCase(sendOtp.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})

export default otpSlicer.reducer