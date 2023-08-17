import React from "react";
import { getToken } from "../../utils/auth";
import { cartActions } from "../../store/cart-slice";
import { useDispatch } from "react-redux";
import { fail } from "../../utils/sweet";

const Item = ({product, discount}) => {
    const dispatch = useDispatch()

    const addItemToCart = () => {
        if(!getToken()) {
            fail('Please login')
            return
        }
        dispatch(cartActions.addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            discount: discount.percent
        }))
    }
    return (
        <div className="p-5 cursor-pointer flex items-center bg-[#222831] text-white overflow-hidden rounded-lg group">
            <div className="mr-4 border-2 border-[#ffbe33] rounded-lg p-3 w-[125px] h-[125px]">
                <img className="w-[100%] h-[100%] group-hover:scale-110 duration-300" src={product.image} alt="" />
            </div>
            <div>
                <div className="translate-y-[10px] group-hover:translate-y-[-5px] duration-300">
                    <h1 className="text-[18px] md:text-[20px] ">{discount.name}</h1>
                    <p className="text-[14px]">{product.name}</p>
                    <div className="flex items-center">
                        <div className="mr-3"><span className="text-[22px] md:text-[26px]">{discount.percent}%</span> <span className="text-[14px]"> Off</span></div>
                        <div className="text-[14px]">( $ {product.price} )</div>
                    </div>
                </div>
                <p onClick={addItemToCart} className="cursor-pointer translate-y-20 inline-block border-b-2 border-[#ffbe33] group-hover:translate-y-0 duration-500">BUY NOW</p>
            </div>
        </div>
    );
};

export default Item;
