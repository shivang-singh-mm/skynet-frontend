import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../slicer/authSlicer'
import postReducer from '../slicer/postSlicer'
import profileReducer from '../slicer/profileSlice';
import searchReducer from '../slicer/searchSlice';
import SuggestionReducer from '../slicer/SuggestionSlicer';
import OtpReducer from '../slicer/otpVerifySlicer';
import ProfileViewReducer from '../slicer/profileViewSlice';
import ModelReducer from '../slicer/ModelSlicer'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        post: postReducer,
        profile: profileReducer,
        search: searchReducer,
        suggestion: SuggestionReducer,
        otp: OtpReducer,
        profileview: ProfileViewReducer,
        model: ModelReducer,
    }
});