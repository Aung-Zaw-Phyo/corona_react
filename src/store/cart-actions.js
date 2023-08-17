import { getToken } from "../utils/auth"
import { fail, success } from "../utils/sweet"
import {cartActions}  from './cart-slice'

export const fetchCartData = () => {
    return async (dispatch) => {
        if(!getToken()) {
            return
        }

        const sendRequest = async () => {
            const response = await fetch('http://localhost:8000/api/get-cart-data', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + getToken()
                }
            })

            if(response.status === 401) {
                const resData = await response.json()
                return resData
            }

            if(!response.ok) {
                throw new Error('Fetching Fial!')
            }

            const resData = await response.json()
            return resData
        }
        // id, name, price, image, amount, quantity
        try {
            const resData = await sendRequest()
            if(resData.status === false) {
                return
            }
            const itemsFromDB = resData.data.items
            const items = itemsFromDB.map(itm => {
                return {
                    id: itm.product.id,
                    name: itm.product.name,
                    price: itm.product.price,
                    image: itm.product.image,
                    quantity: itm.quantity,
                    amount: itm.total_price,
                    discount: itm.discount_percent
                }
            })
            dispatch(cartActions.replaceCart(items))
        } catch (error) {
            // fail('Something wrong, please reload the page.')
            console.log(error.message)
        }
    }
}

export const addToCartRequest = (items) => {
    return async (dispatch) => {
        const sendRequest = async () => {
            const response = await fetch('http://localhost:8000/api/add-to-cart', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + getToken()
                },
                body: JSON.stringify({items: items})
            })

            if(response.status === 422) {
                const resData = await response.json()
                return resData
            }

            if(!response.ok) {
                throw new Error('Sending Failed!')
            }

            const resData = await response.json()
            return resData
        }

        try {
            const resData = await sendRequest()
            if(resData.status === true) {
                success(resData.message)
            }
            if(resData.status === false) {
                fail(resData.message)
            }

            const itemsFromDB = resData.data.items
            const items = itemsFromDB.map(itm => {
                return {
                    id: itm.product.id,
                    name: itm.product.name,
                    price: itm.product.price,
                    image: itm.product.image,
                    quantity: itm.quantity,
                    amount: itm.total_price,
                    discount: itm.discount_percent
                }
            })
            dispatch(cartActions.replaceCart(items))
        } catch (error) {
            console.log(error.message)
        }
    }
}