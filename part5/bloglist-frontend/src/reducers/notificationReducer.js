import {createSlice} from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notification',
    initialState: true,
    reducers: {
        setNotification: (state, action) =>{
            const notificationObject  = action.payload;
            return notificationObject;
        }
    }
})

export const { setNotification } = notificationSlice.actions;
export default notificationSlice.reducer
