import React, { useEffect } from "react";
import {Outlet} from 'react-router-dom'
import Header from "../components/Header";
import Footer from "../components/Footer";
import Cart from "./Cart";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../store/ui-slice";
import { addToCartRequest, fetchCartData } from "../store/cart-actions";

let isInitial = true;

const Root = () => {
    const cart = useSelector(state => state.cart)
    const cartIsShow = useSelector(state => state.ui.cartIsShow)
    const dispatch = useDispatch()

    const cartIsShowChangeHandler = () => {
        dispatch(uiActions.cartShowChangeHandler())
    }

    useEffect(() => {
        if(isInitial) {
            dispatch(fetchCartData())
        }
        
    }, [dispatch])

    useEffect(() => {
        if(isInitial) {
            isInitial = false
            return
        }
        if(!cart.changed) {
            return
        }
        dispatch(addToCartRequest(cart.items))
    }, [cart, dispatch])

    return (
        <div className="flex flex-col min-h-screen">
            {cartIsShow && <Cart onShowChangeHandler={cartIsShowChangeHandler} />}
            <Header/>
                <Outlet/>
            <Footer/>
        </div>
    );
};

export default Root;
