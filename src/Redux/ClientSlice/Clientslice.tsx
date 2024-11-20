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
        },
        setaddclient: (state, action: PayloadAction<any>) => {
            state.values = [...state.values, action.payload];
        },
        setupdateclient: (state, action: PayloadAction<any>) => {
            state.values = state.values.map((item) => item.id === action.payload.id ? action.payload : item);
        },
        setdeleteclient: (state, action: PayloadAction<any>) => {
            state.values = state.values.filter((item) => item.id !== action.payload);
        },
    }
})


export const { setclient, setaddclient, setupdateclient, setdeleteclient } = clientSlice.actions;
export default clientSlice.reducer;