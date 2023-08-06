import React from "react";
import { Link } from "react-router-dom";
import Input from "../UI/Input";
import Textarea from "../UI/Textarea";

const Info = (props) => {
    const user = props.data.user
    console.log(user)
    return (
        <div className="container py-16 ">
            <div className="flex flex-wrap">
                <div className="w-full md:w-5/12 lg:w-4/12 p-2">
                    <div className="p-3 bg-[#F5F5F5] rounded-lg drop-shadow text-center">
                        <h1 className="text-[20px] mb-2">{user.name}</h1>
                        <p className="mb-4">{user.phone}</p>
                        <div className="flex justify-center mb-4">
                            <img className="w-[120px] rounded-full" src={user.profile} alt="" />
                        </div>
                        <p className="mb-2">{user.email}</p>
                        <p className="mb-2">{user.address}</p>
                        <Link to='/logout'>
                            <button className="mt-6 block w-full">Logout</button>
                        </Link>
                    </div>
                </div>
                <div className="w-full md:w-7/12 lg:w-8/12 p-2 ">
                    <div className="bg-[#F5F5F5] rounded-lg drop-shadow p-3">
                        <h1 className="text-[20px] mb-3">Edit Profile</h1>
                        <form>
                            <Input type='text' label='Name' name='name' className='bg-transparent' />

                            <Input type='email' label='Email' name='email' className='bg-transparent' />

                            <Input type='tel' label='Phone Number' name='phone' className='bg-transparent' />

                            <Textarea label='Address' name='address' className='bg-transparent' />

                            <button className="mt-3 w-full">Confirm</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Info;
