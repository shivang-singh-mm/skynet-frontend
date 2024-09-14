import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    isBioEditOpen: false,
    isEditMeModelOpen: false
}


const ModelSlice = createSlice({
    name: 'model',
    initialState,
    reducers: {
        OpenBioEdit: (state) => {
            state.isBioEditOpen = true
        },
        CloseBioEdit: (state) => {
            state.isBioEditOpen = false
        },

        OpenEditMe: (state) => {
            state.isEditMeModelOpen = true
        },
        CloseEditMe: (state) => {
            state.isEditMeModelOpen = false
        }
    },

})


export const { OpenBioEdit, CloseBioEdit, OpenEditMe, CloseEditMe } = ModelSlice.actions;
export default ModelSlice.reducer;