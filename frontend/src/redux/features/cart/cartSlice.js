import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    products: [],
    selectedItems: 0,
    totalPrice: 0,
    tax: 0,
    taxRate: 0.05,
    grandTotal: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const isExist = state.products.find(product => product.id === action.payload.id);
            if (!isExist) {
                state.products.push({ ...action.payload, quantity: 1 });
            }
            else {
                console.log("Product already exists in the cart");
            }
            state.selectedItems = setSelectedItems(state);
            state.totalPrice = setTotalPrice(state);
            state.tax = setTax(state);
            state.grandTotal = setGrandTotal(state);

        },
        removeFromCart(state, action) {

        },
        clearCart(state) {
            state.products = [];
            state.selectedItems = 0;
            state.totalPrice = 0;
            state.tax = 0;
            state.grandTotal = 0;
        },
    },
});


export const setSelectedItems = (state) =>
    state.products.reduce((total, product) => {
        return Number(total + product.quantity);
    }, 0);


export const setTotalPrice = (state) => 
    state.products.reduce((total, product) => {
        return Number(total + (product.price * product.quantity));
    }, 0);


export const setTax = (state) =>  Number(setTotalPrice(state) * state.taxRate);

export const setGrandTotal = (state) => {
    return setTotalPrice(state) + setTotalPrice(state) * state.taxRate;
}

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;