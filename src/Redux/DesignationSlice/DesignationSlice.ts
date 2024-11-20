import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Designation {
    value: any[]
}
const initialState: Designation = {
    value : []
}
const DesignationSlice = createSlice({
    name: "Designation",
    initialState,
    reducers: {
        setDesignation: (state, action: PayloadAction<any>) => {
            state.value = action.payload
        },
        setAddDesignations: (state, action: PayloadAction<any>) => {
            state.value.push(action.payload);
        },
        setDeleteDesignations: (state, action: PayloadAction<any>) => {
            state.value = state.value.filter((item:any) => item.id !== action.payload);
        },
        setUpdateDesignations: (state, action: PayloadAction<any>) => {
            state.value = state.value.map((item:any) => item.id === action.payload.id ? action.payload : item);
        }
    }
})


export const { setDesignation, setAddDesignations, setDeleteDesignations, setUpdateDesignations } = DesignationSlice.actions;
export default DesignationSlice.reducer;