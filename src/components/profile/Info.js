import React, { useCallback, useEffect, useState } from "react";
import { Form, useActionData } from "react-router-dom";
import Input from "../UI/Input";
import Textarea from "../UI/Textarea";
import ProfileCard from "./ProfileCard";
import useInput from "../../hooks/use-input";
import Error from "../UI/Error";
import { success } from "../../utils/sweet";

const Info = (props) => {
    const [error, setError] = useState(null)
    const {
        value: profileValue,
        changeHandler: profileChangeHandler,
        resetHandler: profileResetHandler
    } = useInput(value => true)
    const {
        value: passwordValue,
        changeHandler: passwordChangeHandler,
        resetHandler: passwordResetHandler
    } = useInput(value => true)
    const user = props.data.user
    const data = useActionData()

    const resetHandler = useCallback(() => {
        setError(null)
        profileResetHandler()
        passwordResetHandler()
    }, [])

    useEffect(() => {
        if(data && data.status === false) {
            setError(data.message)
        }
        if(data && data.status === true) {
            resetHandler()
            success(data.message)
        }
    }, [data, resetHandler])
    
    return (
        <div className="container py-16 ">
            <div className="flex flex-wrap">
                <ProfileCard user={user} />
                <div className="w-full md:w-7/12 lg:w-8/12 p-2 ">
                    <div className="bg-[#F5F5F5] rounded-lg drop-shadow p-3">
                        <h1 className="text-[20px] mb-3">Edit Profile</h1>
                        <Error error={error}/>
                        <Form method="POST" encType="multipart/form-data">
                            <Input type='text' label='Name' name='name' className='bg-transparent' defaultValue={user.name}/>

                            <Input type='email' label='Email' name='email' className='bg-transparent' defaultValue={user.email}/>

                            <Input type='tel' label='Phone Number' name='phone' className='bg-transparent' defaultValue={user.phone}/>

                            <Input type='file' label='Profile Image' name='profile' className='bg-transparent h-auto' 
                                value={profileValue} onChange={profileChangeHandler}
                            />

                            <Textarea label='Address' name='address' className='bg-transparent' defaultValue={user.address}/>

                            <Input type='password' label='Password' name='password' className='bg-transparent' 
                                value={passwordValue} onChange={passwordChangeHandler}
                            />

                            <button className="mt-3 w-full">Confirm</button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Info;
