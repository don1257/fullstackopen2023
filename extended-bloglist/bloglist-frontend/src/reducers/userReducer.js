import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: false,
    reducers: {
        setUser: (state, action) =>{
            const userObject  = action.payload;
            return userObject;
        },
        resetUser: (state, action) =>{
            return false
        }
    }
})

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer
