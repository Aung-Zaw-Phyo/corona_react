import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { cartActions } from "../../store/cart-slice";

const ProfileCard = ({user}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logoutHandler = () => {
        dispatch(cartActions.emptyCart())
        navigate('/logout')
    }
    return (
        <div className="w-full md:w-5/12 lg:w-4/12 p-2">
            <div className="p-3 bg-[#F5F5F5] rounded-lg drop-shadow text-center">
                <h1 className="text-[20px] mb-2">{user.name}</h1>
                <p className="mb-4">{user.phone}</p>
                <div className="flex justify-center mb-4">
                    <img className="w-[120px] rounded-full" src={user.profile} alt="" />
                </div>
                <p className="mb-2">{user.email}</p>
                <p className="mb-2">{user.address}</p>
                <button onClick={logoutHandler} className="mt-6 block w-full">Logout</button>
            </div>
        </div>
    );
};

export default ProfileCard;
