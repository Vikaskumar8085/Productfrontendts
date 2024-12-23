import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Dashboard1 {
    value: any[]
}
const initialState: Dashboard1 = {
    value : []
}
const Dashboard1Slice = createSlice({
    name: "Dashboard1",
    initialState,
    reducers: {
        setDashboard1: (state, action: PayloadAction<any>) => {
            state.value = action.payload
        },
        setAddDashboard1s: (state, action: PayloadAction<any>) => {
            state.value.push(action.payload);
        },
        setDeleteDashboard1s: (state, action: PayloadAction<any>) => {
            state.value = state.value.filter((item:any) => item.id !== action.payload);
        },
        setUpdateDashboard1s: (state, action: PayloadAction<any>) => {
            state.value = state.value.map((item:any) => item.id === action.payload.id ? action.payload : item);
        }
    }
})


export const { setDashboard1, setAddDashboard1s, setDeleteDashboard1s, setUpdateDashboard1s } = Dashboard1Slice.actions;
export default Dashboard1Slice.reducer;