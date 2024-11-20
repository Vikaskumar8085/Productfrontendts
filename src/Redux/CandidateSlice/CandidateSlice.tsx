import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CandidateType {
    value: any[]
}
const initialState: CandidateType = {
    value: []
}
const CandidateSlice = createSlice({
    name: "Candidate",
    initialState,
    reducers: {
        setCandidate: (state, action: PayloadAction<any>) => {
            state.value = action.payload
        },
        setAddCandidates: (state, action: PayloadAction<any>) => {
            state.value = [...state.value, action.payload]
        },
        setUpdateCandidates: (state, action: PayloadAction<any>) => {
            state.value = state.value.map((item) => item.id === action.payload.id ? action.payload : item)
        },
        setDeleteCandidates: (state, action: PayloadAction<any>) => {
            state.value = state.value.filter((item) => item.id !== action.payload)
        },
    }
})


export const { setCandidate, setAddCandidates, setUpdateCandidates, setDeleteCandidates } = CandidateSlice.actions;
export default CandidateSlice.reducer;