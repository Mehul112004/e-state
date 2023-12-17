import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser:null,
    error:null,
    loading:false,
};

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        signInStart:(state)=>{
            state.loading = true;
        },
        signInFailure:(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        },
        signInSuccess:(state,action)=>{
            state.loading = false;
            state.currentUser = action.payload;
            state.error = null;
        }
    }
})

export const {signInStart,signInFailure,signInSuccess} = userSlice.actions;
export default userSlice.reducer;