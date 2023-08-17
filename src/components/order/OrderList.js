import React from "react";
import ComponentLoading from "../UI/ComponentLoading";
import { Link } from "react-router-dom";
import OrderItem from "./OrderItem";

const OrderList = (props) => {
    const orders = props.data.data
    const next = props.data.links.next
    const prev = props.data.links.prev

    const loadHandler = (link) => {
        props.fetcher.load(`/order?index&link=${link}`)
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }
    return (
        <div className="container py-16">
            {props.fetcher.state === 'loading' && <ComponentLoading/>}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
                {
                    orders.map(order => ( 
                        <OrderItem key={order.id} order={order}/>
                    ))
                }
            </div>
                {
                    orders.length === 0 &&
                    <div className="py-5 group text-center">
                        <span className="text-center border-2 border-transparent border-b-[#ffbe33] p-1 group-hover:scale-110 duration-300"><Link to='/menu' className="text-center">Go Shopping</Link></span>
                    </div>
                }

            <div className="text-center mt-6">
                {
                    prev && 
                    <button onClick={loadHandler.bind(null, prev)} className="outline_btn">Prev</button>
                }
                {
                    next && 
                    <button onClick={loadHandler.bind(null, next)} className="outline_btn">Next</button>
                }
            </div>
        </div>
    );
};

export default OrderList;
