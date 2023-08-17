import React, { Suspense, useEffect } from "react";
import hero_img from "../images/hero-bg.jpg";
import burger_img from '../images/burger.png'
import pizza_img from '../images/pizza.png'
import pasta_video from '../images/pasta.mp4'
import { getToken } from "../utils/auth";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartData } from "../store/cart-actions";
import { cartActions } from "../store/cart-slice";
import { Await, Link, defer, json, useLoaderData } from "react-router-dom";
import ComponentLoading from "../components/UI/ComponentLoading";
import ComponentError from "../components/UI/ComponentError";
import Discount from "../components/home/Discount";
import HeroSection from "../components/home/HeroSection";
import BurgerSection from "../components/home/BurgerSection";
import PizzaSection from "../components/home/PizzaSection";
import PastaSection from "../components/home/PastaSection";

let isInitial = true
const Home = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector(state => state.cart.isAuth)
    const loadedData = useLoaderData()


    useEffect(() => {
        if(getToken() && !isInitial && !isAuth) {
            dispatch(fetchCartData())
            dispatch(cartActions.isAuthChangeHandler())
        }
        if(isInitial) {
            isInitial = false
        }
        
    }, [dispatch, isAuth])

    return (
        <>
            <HeroSection img={hero_img}/>
            
            {/* Discount Section */}
            <Suspense fallback={<ComponentLoading/>}>
                <Await resolve={loadedData.discount} errorElement={<ComponentError/>}>
                    {(data) => <Discount data={data} />}
                </Await>
            </Suspense>

            <BurgerSection img={burger_img}/>

            <PizzaSection img={pizza_img} />

            <PastaSection video={pasta_video}/>
        </>
    );
};

export default Home;

const discountLoader = async () => {
    const response = await fetch('http://localhost:8000/api/discount-product', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
  
    if(!response.ok) {
        throw json({message: 'Something wrong.'}, {status: 500})
    }
  
    const resData = await response.json()
    return resData
  }
  
export const loader = ({request, params}) => {
    return defer({
      discount: discountLoader()
    })
}
