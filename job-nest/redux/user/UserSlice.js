import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    currentuser: null,
    loading: false,
    error: null,
}

const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signinStart: (state)=>{
            state.loading = true;
        },
        signinSuccess: (state)=>{
            state.loading = true;
            state.currentuser = action.payload;
            state.error = null;
        },
        signinFailure: (state)=>{
            state.loading = false;
            state.error = action.payload;
        },
        signoutStart: (state)=>{
            state.loading = true;
        },
        signoutSuccess: (state)=>{
            state.loading = true;
            state.currentuser = action.payload;
            state.error = null;
        },
        signoutFailure: (state)=>{
            state.loading = false;
            state.error = action.payload;
        },
        updateUserStart: (state)=>{
            state.loading = true;
        },
        updateUserSuccess: (state)=>{
            state.loading = true;
            state.error = null;
            state.currentuser = action.payload;
        },
        updateUserFailure: (state)=>{
            state.loading = false;
            state.error =  action.payload;
        }
    }
})
export const {
    signinStart,
    signinSuccess,
    signinFailure,
    signoutStart,
    signoutSuccess,
    signoutFailure,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
} = UserSlice.actions;

export default UserSlice.reducer;