import React, { useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import {IoMdRemove, IoMdAdd} from 'react-icons/io'
import { cartActions } from "../store/cart-slice";
import PaymentForm from "../components/Cart/PaymentForm";

// const stripePromise = loadStripe('pk_test_51NNY6yLUTxip4b30lKF0gPFZP06dlh858wLWsGFheOHLRS7V0Gh23ohLuZrXusfwm3q81sSctzw5dtwE4gJeqxSc005WrKrVUl');

const Backdrop = ({onChange}) => {
    return (
      <div onClick={onChange} className="fixed top-0 bottom-0 left-0 right-0 w-full h-screen bg-gray-600/60 z-10"/>
    )
}

const Modal = (props) => {  
    const [isCheckout, setIsCheckout] = useState(false)
    const items = useSelector(state => state.cart.items)
    const totalAmount = useSelector(state => state.cart.totalAmount)
    const dispatch = useDispatch()

    const checkoutHandler = () => {
        setIsCheckout(prev => !prev)
    }
    
    const addItemToCart = (item) => {
        dispatch(cartActions.addItem({
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
        }))
    }

    const removeItemToCart = (item) => {
        dispatch(cartActions.removeItem(item.id))
    }


    return (
        <div className="fixed h-[80%] overflow-y-hidden rounded-lg flex justify-center items-center w-[100%] md:w-[70%] lg:w-[60%] xl:w-[50%] p-3 left-[50%] top-[50%] z-50" style={{ transform: 'translate(-50%, -50%)' }}>
            <div className="bg-white w-full max-h-full overflow-y-scroll no-scrollbar p-3 py-5 rounded-lg">
                {
                    !isCheckout && (
                        <div>
                            {
                                items.map(item => (
                                    <div className="mb-3 flex justify-between" key={item.id}>
                                        <div className="flex items-center">
                                            <div className="p-2 bg-[#eee] rounded-lg">
                                                <img className="" width={50} height={50} src={item.image} alt="" />
                                            </div>
                                            <div className="ms-3">
                                                <p>{item.name}</p>
                                                <p>${item.price} <span className="mx-2">x</span> {item.quantity}</p>
                                            </div>
                                        </div>
                                        <div className="text-end">
                                            <p className=' text-[18px] mb-2'>${item.amount}</p>
                                            <div>
                                                <button className="w-auto h-auto p-[8px] outline_btn"
                                                    onClick={removeItemToCart.bind(null, item)}
                                                >
                                                    <IoMdRemove/>
                                                </button>
                                                <button className="w-auto h-auto p-[8px] outline_btn"
                                                    onClick={addItemToCart.bind(null, item)}
                                                >
                                                    <IoMdAdd/>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }

                            {
                                items.length === 0 && (
                                    <div className="text-center">
                                        There is no item.
                                    </div>
                                )
                            }
                            <div className="flex justify-between mb-3 font-bold">
                                <span>Total Amount</span>
                                <span className="m-1">$ <span className="text-[20px]">{totalAmount}</span></span>
                            </div>
                        </div>
                    )
                }

                {
                    isCheckout && <PaymentForm/>
                }
                <div className="w-full h-[.5px] bg-[#33333342] mb-3" />
                <div className="text-end">
                    <button onClick={props.onChange} className="w-auto h-auto p-[8px] outline_btn">CLOSE</button>
                    {
                        !isCheckout && <button onClick={checkoutHandler} className="w-auto h-auto p-[8px] outline_btn">CHECKOUT</button>
                    }
                    {
                        isCheckout && <button onClick={checkoutHandler} className="w-auto h-auto p-[8px] outline_btn">CANCEL</button>
                    }
                </div>
            </div>
        </div>
    )
}

const portalElement = document.getElementById('cart-container')

const Cart = (props) => {
    return (
        <>
            {
                createPortal(<Backdrop onChange={props.onShowChangeHandler}/>, portalElement)
            }
            {
                createPortal(<Modal onChange={props.onShowChangeHandler}/>, portalElement)
            }
        </>
    );
};

export default Cart;
