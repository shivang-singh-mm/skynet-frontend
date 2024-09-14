import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
    profile: [],
    user: [],
    status: 'idle',
    error: null,
    history: [],
    timeLine: [],
    update_status: 'idle'
};


const baseUrl = process.env.REACT_APP_API_URL

export const fetchUser = createAsyncThunk('profile/fetchProfile', async () => {
    const userId = localStorage.getItem('skyn_userId')
    const response = await axios.get(`${baseUrl}/get/general?userId=${userId}`, {
        headers: {
            'authorization': 'Bearer ' + localStorage.getItem('skyn_token'),
            'Content-Type': 'application/json'
        }
    });
    localStorage.setItem('profile_pic', response.data.body.profilePic)
    return response.data;
});

export const ViewUser = createAsyncThunk('profile/ViewUser', async (userid) => {

    const response = await axios.get(`${baseUrl}/get/general?userId=${userid}`, {
        headers: {
            'authorization': 'Bearer ' + localStorage.getItem('skyn_token'),
            'Content-Type': 'application/json'
        }
    });
    return response.data;
});

export const updateUser = createAsyncThunk('profile/updateUser ', async (userData) => {
    const response = await axios.put(`${baseUrl}/update/info`, userData, {
        headers: {
            'authorization': 'Bearer ' + localStorage.getItem('skyn_token'),
            'Content-Type': 'application/json'
        },
    });
    console.log(response)
    return response.data;
});

export const updateInfo = createAsyncThunk('profile/updateInfo', async (userData) => {
    const response = await axios.put(`${baseUrl}/update/profile`, userData, {
        headers: {
            'authorization': 'Bearer ' + localStorage.getItem('skyn_token'),
            'Content-Type': 'application/json'
        }
    })
    return response.data
})

export const CreatHistory = createAsyncThunk('profile/creatHistroy', async (userData) => {
    const response = await axios.post(`${baseUrl}/history/create`, userData, {
        headers: {
            'authorization': 'Bearer ' + localStorage.getItem('skyn_token'),
            'Content-Type': 'application/json'
        },
    });
    return response.data;
});



export const fetchHistory = createAsyncThunk('profile/getHistroy', async (userId) => {
    // const userId = localStorage.getItem('skyn_userId')
    const response = await axios.get(`${baseUrl}/history/get/${userId}`, {
        headers: {
            'authorization': 'Bearer ' + localStorage.getItem('skyn_token'),
            'Content-Type': 'application/json'
        },
    });
    return response.data;
});

export const CreatTimeLine = createAsyncThunk('profile/CreatTimeLine', async (TimeLineData) => {
    const response = await axios.post(`${baseUrl}/timelineEvent/create`, TimeLineData, {
        headers: {
            'authorization': 'Bearer ' + localStorage.getItem('skyn_token'),
            'Content-Type': 'application/json'
        },
    });
    return response.data;
});

export const fetchTimeLine = createAsyncThunk('profile/fetchTimeLine', async (userId) => {

    const response = await axios.get(`${baseUrl}/timelineEvent/get/${userId}`, {
        headers: {
            'authorization': 'Bearer ' + localStorage.getItem('skyn_token'),
            'Content-Type': 'application/json'
        },
    });

    return response.data;
});

export const fetchUserTimeLine = createAsyncThunk('profile/fetchTimeLine', async (userId) => {
    // const userId = localStorage.getItem('skyn_userId')

    const response = await axios.get(`${baseUrl}/timelineEvent/get/${userId}`, {
        headers: {
            'authorization': 'Bearer ' + localStorage.getItem('skyn_token'),
            'Content-Type': 'application/json'
        },
    });

    return response.data;
});

// export const deleteHistory = createAsyncThunk()


const profileSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setStatus: (state, action) => {
            state.status = action.payload;
        },
        resetStatus: (state) => {
            state.update_status = 'idle';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.status = 'loading';
                state.update_status = 'idle'
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.profile = action.payload.body;
                state.update_status = 'idle'
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
                state.update_status = 'idle'

            })


            .addCase(CreatHistory.pending, (state) => {
                state.update_status = 'loading';
            })
            .addCase(CreatHistory.fulfilled, (state, action) => {
                state.update_status = 'succeeded';
                state.history = action.payload;
            })
            .addCase(CreatHistory.rejected, (state, action) => {
                state.update_status = 'failed';
                state.error = action.error.message;

            })

            .addCase(fetchHistory.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchHistory.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.history = action.payload.body;
            })
            .addCase(fetchHistory.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            .addCase(CreatTimeLine.pending, (state) => {
                state.update_status = 'loading';
            })
            .addCase(CreatTimeLine.fulfilled, (state, action) => {
                state.update_status = 'succeeded';
                state.timeLine = action.payload;
            })
            .addCase(CreatTimeLine.rejected, (state, action) => {
                state.update_status = 'failed';
                state.error = action.error.message;

            })

            .addCase(fetchTimeLine.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTimeLine.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.timeLine = action.payload;
            })
            .addCase(fetchTimeLine.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })


            .addCase(ViewUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(ViewUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload.body;
            })
            .addCase(ViewUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            .addCase(updateUser.pending, (state) => {
                state.update_status = 'loading';
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.update_status = 'succeeded';
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.update_status = 'failed';
                state.error = action.error.message;
            })
    },

});
export const { setStatus, resetStatus } = profileSlice.actions;
export default profileSlice.reducer;

