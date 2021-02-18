import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name : 'login',
    initialState: {
        token:0,
        testr:0
    },
    reducers: {
        login : (state, action) => {
            state.token = action.payload;
        },
        logout : state => {
            state.token = -1;
        },
        complete : state => {
            state.testr = state.testr + 1;
        }
    },


});
const { actions, reducer } = userSlice;
export const {login, logout, complete} = actions;


export default reducer;

