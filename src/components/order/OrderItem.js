import React from "react";
import { AiFillClockCircle, AiOutlineMessage, AiOutlineNumber, AiOutlinePhone } from "react-icons/ai";
import { MdDriveFileRenameOutline, MdLocationCity,MdPendingActions } from "react-icons/md";

const OrderItem = ({order}) => {
    return (
        <div className="relative bg-[#fff] p-3 md:p-6 rounded-lg border-[1px] border-[#ffbe33] hover:drop-shadow-lg duration-500 cursor-pointer">
            <div className="absolute top-[0px] right-[0px] rounded-bl-lg rounded-tr-lg text-white text-[14px] flex items-center bg-[#ffbe33] p-[2px] px-[4px]">
                <AiFillClockCircle size={16} className="mr-2"/>
                {order.created_at}
            </div>
            <p className="mb-3 flex items-center flex-wrap mt-3">
                <span className="w-40 flex items-center text-black/70"> 
                    <AiOutlineNumber size={16} className="text-[#ffbe33] mr-2"/> 
                    <span>Order Number</span>
                </span>
                <span className="">{order.order_no}</span>
            </p>
            <p className="mb-3 flex items-center flex-wrap">
                <span className="w-40 flex items-center text-black/70"> 
                    <MdPendingActions size={16} className="text-[#ffbe33] mr-2"/> 
                    <span>Status</span>
                </span>
                <span className="">{order.status}</span>
            </p>
            <p className="mb-3 flex items-center flex-wrap">
                <span className="w-40 flex items-center text-black/70">
                    <MdDriveFileRenameOutline size={16} className="text-[#ffbe33] mr-2"/> Name
                </span>
                <span>{order.name}</span>
            </p>
            <p className="mb-3 flex items-center flex-wrap">
                <span className="w-40 flex items-center text-black/70">
                    <AiOutlinePhone size={16} className="text-[#ffbe33] mr-2"/>
                    Phone
                </span>
                <span>{order.phone}</span>
            </p>
            <p className="mb-3 flex items-center flex-wrap">
                <span className="w-40 flex items-center text-black/70">
                    <MdLocationCity size={16} className="text-[#ffbe33] mr-2"/>
                    Address
                </span>
                <span>{order.address}</span>
            </p>
            <p className="mb-3 flex items-center flex-wrap">
                <span className="w-40 flex items-center text-black/70">
                    <AiOutlineMessage size={16} className="text-[#ffbe33] mr-2"/>
                    Message
                </span>
                <span>{order.message}</span>
            </p>
        </div>
    );
};

export default OrderItem;
