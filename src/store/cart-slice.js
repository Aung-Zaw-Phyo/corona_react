import { createSlice, current } from "@reduxjs/toolkit";

// id, name, price, image, amount, quantity

const initialState = {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
    changed: false,
    isAuth: false,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        replaceCart(state, action) {
            state.changed = false
            state.items = action.payload
            state.totalQuantity = action.payload.length
            const totalAmount = action.payload.length > 0 ? action.payload.reduce((previousValue = 0, currentValue) => {
                return previousValue + currentValue.amount
            }, 0) : 0
            state.totalAmount = totalAmount
        },

        emptyCart(state, action) {
            state.items = []
            state.totalAmount = 0
            state.totalQuantity = 0
            state.changed = false
            state.isAuth = false
        },

        isAuthChangeHandler(state, action) {
            state.isAuth = !state.isAuth
        },

        addItem(state, action) {
            state.changed = true
            let newItem = {
                id: action.payload.id,
                name: action.payload.name,
                price: action.payload.price,
                image: action.payload.image,
            };

            const existingItem = state.items.find((item) => item.id === newItem.id )

            state.totalAmount = Number(state.totalAmount) + Number(newItem.price)
            if(!existingItem) {
                state.totalQuantity ++
                state.items.push({
                    ...newItem, quantity: 1, amount: newItem.price
                })
            }else {
                existingItem.quantity ++
                existingItem.amount = Number(existingItem.amount) + Number(existingItem.price)
            }
        },

        removeItem(state, action) {
            state.changed = true
            const id = action.payload;
            const item = state.items.find(item => item.id === id)
            state.totalAmount = Number(state.totalAmount) - Number(item.price)
            if(Number(item.quantity) === 1) {
                state.totalQuantity --
                const updatedItems = state.items.filter(item => item.id !== id)
                state.items = updatedItems
            }else {
                item.amount = item.amount - item.price
                item.quantity --
            }

        }

    }
})

export const cartActions = cartSlice.actions

export default cartSlice