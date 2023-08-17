import { createSlice, current } from "@reduxjs/toolkit";

// id, name, price, image, amount, quantity, discount

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
                return previousValue + Number(currentValue.amount)
            }, 0) : 0
            state.totalAmount = Number(totalAmount).toFixed(2)
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
                discount: action.payload.discount
            };

            const existingItem = state.items.find((item) => item.id === newItem.id )

            const discount = newItem.discount ? newItem.discount : 0
            const newItemAmount = ((100 - discount) / 100) * newItem.price
            
            const totalAmount = Number(state.totalAmount) + newItemAmount
            state.totalAmount = totalAmount.toFixed(2)

            if(!existingItem) {
                state.totalQuantity ++
                state.items.push({
                    ...newItem, quantity: 1, amount: newItemAmount.toFixed(2)
                })
            }else {
                existingItem.quantity ++
                let discount = existingItem.discount
                if(newItem.discount && (Number(newItem.discount) !== Number(discount))) {
                    discount = newItem.discount > existingItem.discount ? newItem.discount : existingItem.discount
                }
                existingItem.discount = discount
                const updatedAmount = (((100 - discount) / 100) * newItem.price) * existingItem.quantity
                existingItem.amount = updatedAmount.toFixed(2)
                console.log(discount)
            }
        },

        removeItem(state, action) {
            state.changed = true
            const id = action.payload;
            const item = state.items.find(item => item.id === id)
            const totalAmount = state.totalAmount - (((100 - item.discount) / 100) * item.price)
            state.totalAmount = totalAmount.toFixed(2)

            if(Number(item.quantity) === 1) {
                state.totalQuantity --
                const updatedItems = state.items.filter(item => item.id !== id)
                state.items = updatedItems
            }else {
                item.quantity --
                const amount = (((100 - item.discount) / 100) * item.price) * item.quantity
                item.amount = amount.toFixed(2)
            }

        }

    }
})

export const cartActions = cartSlice.actions

export default cartSlice