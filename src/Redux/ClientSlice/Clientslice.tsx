import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface clienttype {
    values: any[]
}
const initialState: clienttype = {
    values: []
}
const clientSlice = createSlice({
    name: "client ",
    initialState,
    reducers: {
        setclient: (state, action: PayloadAction<any>) => {
            state.values = action.payload;
        }
    }
})


export const { setclient } = clientSlice.actions;
export default clientSlice.reducer;