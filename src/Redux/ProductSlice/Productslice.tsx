import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProductType {
    value: []
}
const initialState: ProductType = {
    value: []
}
const ProductSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<any>) => {
            state.value = action.payload
        }
    }
})


export const { setProducts } = ProductSlice.actions;
export default ProductSlice.reducer;