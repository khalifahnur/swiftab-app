import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
    id: number;
    name: string | string[];
    image:string | null | string[];
    cost: number;
    description:string;
    quantity:number;
    rate:number;
}

export interface CartState {
    value: number;
    cart: CartItem[];
}

const initialState: CartState = {
    value: 0,
    cart: [],
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            state.cart.push(action.payload);
            console.log("cart items",state.cart)
        },
        removeItems: (state, action: PayloadAction<number>) => {
            state.cart = state.cart.filter((item) => item.id !== action.payload);
        },
        emptyCart:(state)=>{
            state.cart = [];
        }
    },
});


export const { addToCart, removeItems, emptyCart } = cartSlice.actions;
export default cartSlice.reducer;
