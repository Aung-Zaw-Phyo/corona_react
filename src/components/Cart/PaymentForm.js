import React, { useState } from "react";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { getToken } from "../../utils/auth";
import Input from "../UI/Input";
import Textarea from "../UI/Textarea";
import useInput from "../../hooks/use-input";
import { useDispatch, useSelector } from "react-redux";
import { fail, success } from "../../utils/sweet";
import { cartActions } from "../../store/cart-slice";
// import {loadStripe} from '@stripe/stripe-js';


const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()

    const {
        value: nameValue,
        isValid: nameIsValid,
        changeHandler: nameChangeHandler,
        blurHandler: nameBlurHandler,
        hasError: nameHasError
    } = useInput(value => value.trim() !== '')
    const {
        value: phoneValue,
        isValid: phoneIsValid,
        changeHandler: phoneChangeHandler,
        blurHandler: phoneBlurHandler,
        hasError: phoneHasError
    } = useInput(value => value.trim() !== '')
    const {
        value: addressValue,
        isValid: addressIsValid,
        changeHandler: addressChangeHandler,
        blurHandler: addressBlurHandler,
        hasError: addressHasError
    } = useInput(value => value.trim() !== '')
    const {
        value: messageValue,
        isValid: messageIsValid,
        changeHandler: messageChangeHandler,
        blurHandler: messageBlurHandler,
        hasError: messageHasError
    } = useInput(value => true)

    const formIsValid = nameIsValid && phoneIsValid && addressIsValid && messageIsValid


    const handlePayment = async (e) => {
        e.preventDefault()
        setLoading(true);
    
        if (!stripe || !elements) {
          return;
        }
        const { paymentMethod, error } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });
    
        if (error) {
          console.error('error ', error.message);
          setLoading(false);
          return;
        }
        
        // Send the paymentMethod.id to your server
        const response = await fetch('http://localhost:8000/api/create-payment-intent', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            },
            body: JSON.stringify({
                paymentMethodId: paymentMethod.id,
                name: nameValue,
                phone: phoneValue,
                address: addressValue,
                message: messageValue
            }),
        });

        if(response.status === 422){
            const resData = await response.json()
            fail(resData.message)
            setLoading(false);
            return
        }

        if(!response.ok){
            fail('Something Wrong!')
            setLoading(false);
            return
        }

        const resData = await response.json()

        success(resData.message)
        const itemsFromDB = resData.data.items
        const items = itemsFromDB.map(itm => {
            return {
                id: itm.product.id,
                name: itm.product.name,
                price: itm.product.price,
                image: itm.product.image,
                quantity: itm.quantity,
                amount: Number(itm.quantity) * Number(itm.product.price)
            }
        })
        dispatch(cartActions.replaceCart(items))
        setLoading(false);
    };

    const cardElementOptions = {
        style: {
            base: {
              iconColor: '#333',
              color: '#333',
              fontWeight: '500',
              fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
              fontSize: '16px',
              fontSmoothing: 'antialiased',
              ':-webkit-autofill': {
                color: '#333',
              },
              '::placeholder': {
                color: '#333',
              },
            },
            invalid: {
                marginBottom: '50px',
              iconColor: '#333',
              color: '#333',
            },
          },
    };

    return (
        <div className="mb-3">
            <form onSubmit={handlePayment}>
                <h1 className="text-center mb-3 font-bold">PAYMENT FORM</h1>
                <div className="mb-3 rounded w-full outline-none border-[1.5px] border-gray-400 h-[40px] p-2 focus:border-[#222811b1] duration-300">
                    <CardElement options={cardElementOptions} />
                </div>
                <Input type='text' name='name' label='Name' 
                    value={nameValue}
                    onChange={nameChangeHandler}
                    onBlur={nameBlurHandler}
                    error={nameHasError}
                />
                <Input type='tel' name='phone' label='Phone' 
                    value={phoneValue}
                    onChange={phoneChangeHandler}
                    onBlur={phoneBlurHandler}
                    error={phoneHasError}
                />
                <Textarea name='address' label='Address' 
                    value={addressValue}
                    onChange={addressChangeHandler}
                    onBlur={addressBlurHandler}
                    error={addressHasError}
                />
                <Textarea name='message' label='Message' 
                    value={messageValue}
                    onChange={messageChangeHandler}
                    onBlur={messageBlurHandler}
                    error={messageHasError}
                />
                <button className="w-full mt-3" disabled={!stripe || !elements || loading || !formIsValid}>
                        {loading ? 'Processing...' : 'Pay'}
                </button>
            </form>
        </div>
    );
};

export default PaymentForm;
