import React from "react";
import { useDispatch } from "react-redux";
import {cartActions} from '../../store/cart-slice'
import { fail } from "../../utils/sweet";
import { getToken } from "../../utils/auth";

const MenuItem = ({product}) => {
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
            discount: product.discount
        }))
    }
    return (
        <div className="group">
            <div className="relative p-3 py-4 text-center overflow-hidden bg-[#fff] rounded-lg border-none group-hover:drop-shadow-lg duration-500">
                {
                    product.discount && product.discount > 0 ?
                    <div className="absolute right-0 top-0 bg-[#ffbe33] rounded-bl-lg rounded-tr-lg p-[4px] text-white text-[18px] -translate-y-20 group-hover:translate-y-0 duration-300">
                        {product.discount + '%'}
                    </div> : null
                }
                <div className="w-full flex justify-center mb-4">
                    <img className="w-[160px] h-[160px] group-hover:scale-110 duration-500" src={product.image} alt="" />
                </div>
                <p className=" group-hover:text-[#333333ad] duration-500 mb-2">{product.name}</p>
                <p className="group-hover:hidden duration-500">$ {product.price}</p>
                <p onClick={addItemToCart} className="cursor-pointer translate-y-20 inline-block border-b-2 border-[#333] group-hover:translate-y-0 duration-500">BUY NOW</p>
            </div>
        </div>
    );
};

export default MenuItem;
