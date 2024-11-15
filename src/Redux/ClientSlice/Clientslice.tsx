import { createSlice } from '@reduxjs/toolkit';

interface clienttype {
    values: []
}

const initialState: clienttype = {
    values: []
}

const clientSlice = createSlice({
    name: "client ",
    initialState,
    reducers: {
        setclient: (state, action) => {

        }
    }
})


export const { setclient } = clientSlice.actions;
export default clientSlice.reducer;