import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null,
    loading: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
        },
        signInFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        signInSuccess: (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
            state.error = null;
        },
        updateUserStart: (state) => {
            state.loading = true;
        },
        updateUserSuccess: (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
            state.error = null;
        },
        updateUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteUserStart: (state) => {
            state.loading = true;
        },
        deleteUserSuccess: (state) => {
            state.loading = false
            state.currentUser = null
            state.error = null
        },
        deleteUserFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        signOutStart: (state) => {
            state.loading = true;
        },
        signOutSuccess: (state) => {
            state.loading = false
            state.currentUser = null
            state.error = null
        },
        signOutFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        imageUploadStart:(state)=>{
            state.loading=true
        },
        imageUploadFailure:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        },
        imageUploadSuccess:(state)=>{
            state.loading=false;
        }
    }
})

export const {
    signInStart,
    signInFailure,
    signInSuccess,
    updateUserFailure,
    updateUserSuccess,
    updateUserStart,
    deleteUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    signOutFailure,
    signOutStart,
    signOutSuccess,
    imageUploadFailure,
    imageUploadStart,
    imageUploadSuccess
} = userSlice.actions;
export default userSlice.reducer;