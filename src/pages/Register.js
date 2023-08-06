import React, { useEffect, useState } from "react";
import img from '../images/group.jpg'
import { Form, Link, json, redirect, useActionData, useNavigation } from "react-router-dom";
import Input from "../components/UI/Input";
import Textarea from "../components/UI/Textarea";
import Error from "../components/UI/Error";
import useInput from "../hooks/use-input";



const Register = () => {
    const [error, setError] = useState(null)
    const data = useActionData()
    const navigation = useNavigation()
    const submitting = navigation.state === 'submitting'

    useEffect(() => {
        if(data && data.status === false) {
            setError(data.message)
        }
    }, [data])

    const {
        value: nameValue,
        isValid: nameIsValid,
        hasError: nameHasError,
        changeHandler: nameChangeHandler,
        blurHandler: nameBlurHandler
    }  = useInput((value)  => value.trim() !== '')

    const {
        value: emailValue,
        isValid: emailIsValid,
        hasError: emailHasError,
        changeHandler: emailChangeHandler,
        blurHandler: emailBlurHandler
    }  = useInput((value)  => value.includes('@'))

    const {
        value: phoneValue,
        isValid: phoneIsValid,
        hasError: phoneHasError,
        changeHandler: phoneChangeHandler,
        blurHandler: phoneBlurHandler
    }  = useInput((value)  => value.trim().length >= 5)

    const {
        value: addressValue,
        isValid: addressIsValid,
        hasError: addressHasError,
        changeHandler: addressChangeHandler,
        blurHandler: addressBlurHandler
    }  = useInput((value)  => true)

    const {
        value: passwordValue,
        isValid: passwordIsValid,
        hasError: passwordHasError,
        changeHandler: passwordChangeHandler,
        blurHandler: passwordBlurHandler
    }  = useInput((value)  => value.trim() !== '')

    const validForm = nameIsValid && emailIsValid && phoneIsValid && passwordIsValid

    return (
        <div className="relative h-screen w-full">
            <img className="w-full h-full object-cover" src={img} alt="" />

            <div className="absolute top-0 w-full h-full bg-[#33333370] overflow-auto">
                <div className="container grid h-full py-5">
                    <div className="w-full sm:w-10/12 lg:w-6/12 mx-auto h-full flex items-center">
                        <div className="p-5 w-full bg-[#ffffffcd] rounded-lg">
                            <h1 className="text-center text-[22px] mb-3">Fill the form to register</h1>
                            <Error error={error}/>
                            <Form method="POST" className="mb-3">
                                <Input type='text' name="name" label='Name' className='bg-transparent' 
                                    onChange={nameChangeHandler}
                                    onBlur={nameBlurHandler}
                                    value={nameValue}
                                    error={nameHasError}
                                />

                                <Input type='email' name="email" label='Email' className='bg-transparent' 
                                    onChange={emailChangeHandler}
                                    onBlur={emailBlurHandler}
                                    value={emailValue}
                                    error={emailHasError}
                                />

                                <Input type='tel' name="phone" label='Phone' className='bg-transparent' 
                                    onChange={phoneChangeHandler}
                                    onBlur={phoneBlurHandler}
                                    value={phoneValue}
                                    error={phoneHasError}
                                />

                                <Textarea name='address' label='Address' className='bg-transparent'
                                    onChange={addressChangeHandler}
                                    onBlur={addressBlurHandler}
                                    value={addressValue}
                                    error={addressHasError}
                                />

                                <Input type='password' name="password" label='Password' className='bg-transparent' 
                                    onChange={passwordChangeHandler}
                                    onBlur={passwordBlurHandler}
                                    value={passwordValue}
                                    error={passwordHasError}
                                />

                                <button disabled={submitting || !validForm} className={`${submitting || !validForm ? 'btn_disable' : ''} block w-full mt-5`}>Confirm</button>
                            </Form>
                            <Link to='/login' className="border-transparent border-b-2 py-1 hover:border-[#ffbe33] duration-300">Already have an account?</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;

export const action = async ({request, params}) => {
    const data = await request.formData();
    const formData = {
        name: data.get('name'),
        email: data.get('email'),
        phone: data.get('phone'),
        address: data.get('address'),
        password: data.get('password'),
    }

    const fetchOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify(formData),
        credentials: 'include', // Send cookies with the request
    };

    // Fetch CSRF cookie first
    await fetch('http://localhost:8000/sanctum/csrf-cookie', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
        },
        credentials: 'include',
    });

    // Fetch login API
    const response = await fetch('http://localhost:8000/api/register', fetchOptions);


    if(response.status === 422) {
        const resData = await response.json()
        return resData
    }

    if(!response.ok) {
        throw json({message: 'Something wrong!'}, {status: 500}) 
    }

    const resData = await response.json()
    const token = resData.data.token
    localStorage.setItem('token', token)
    return redirect('/')
}
