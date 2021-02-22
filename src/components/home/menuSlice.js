import {createSlice} from '@reduxjs/toolkit';

export const menuSlice = createSlice({
    name : 'menu',
    initialState: {
        menu : 0
    },
    reducers : {
        change : (state, action) => {
            state.menu = action.payload;
        }
    }
});


const {actions, reducer} = menuSlice;
export const { change } = actions;

export default reducer;