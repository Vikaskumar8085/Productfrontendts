import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CandidateType {
    value: []
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
            // state.value.push(action.payload);
        }
    }
})


export const { setCandidate, setAddCandidates } = CandidateSlice.actions;
export default CandidateSlice.reducer;