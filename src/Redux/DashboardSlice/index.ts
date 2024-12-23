import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Dashboard {
    value: any[]
}
const initialState: Dashboard = {
    value : []
}
const DashboardSlice = createSlice({
    name: "Dashboard",
    initialState,
    reducers: {
        setDashboard: (state, action: PayloadAction<any>) => {
            state.value = action.payload
        },
        setAddDashboards: (state, action: PayloadAction<any>) => {
            state.value.push(action.payload);
        },
        setDeleteDashboards: (state, action: PayloadAction<any>) => {
            state.value = state.value.filter((item:any) => item.id !== action.payload);
        },
        setUpdateDashboards: (state, action: PayloadAction<any>) => {
            state.value = state.value.map((item:any) => item.id === action.payload.id ? action.payload : item);
        }
    }
})


export const { setDashboard, setAddDashboards, setDeleteDashboards, setUpdateDashboards } = DashboardSlice.actions;
export default DashboardSlice.reducer;