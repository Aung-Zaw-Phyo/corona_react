import React, { useEffect, useState } from "react";
import img from '../images/group.jpg'
import { Form, Link, json, redirect, useActionData, useNavigation } from "react-router-dom";
import Input from "../components/UI/Input";
import Error from "../components/UI/Error";
import useInput from "../hooks/use-input";

const Login = () => {
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
        value: emailValue,
        isValid: emailIsValid,
        hasError: emailHasError,
        changeHandler: emailChangeHandler,
        blurHandler: emailBlurHandler
    }  = useInput((value)  => value.includes('@'))

    const {
        value: passwordValue,
        isValid: passwordIsValid,
        hasError: passwordHasError,
        changeHandler: passwordChangeHandler,
        blurHandler: passwordBlurHandler
    }  = useInput((value)  => value.trim() !== '')

    const validForm = emailIsValid && passwordIsValid

    return (
        <div className="relative h-screen w-full">
            <img className="w-full h-full object-cover" src={img} alt="" />

            <div className="absolute top-0 w-full h-full bg-[#33333370]">
                <div className="container grid h-full py-3">
                    <div className="w-full sm:w-10/12 lg:w-6/12 mx-auto h-full flex items-center">
                        <div className="p-5 w-full bg-[#ffffffcd] rounded-lg">
                            <h1 className="text-center text-[22px] mb-3">Fill the form to login</h1>
                            <Error error={error}/>
                            <Form method="POST" className="mb-3">
                                <Input type='email' name="email" label='Email' className='bg-transparent' 
                                    onChange={emailChangeHandler}
                                    onBlur={emailBlurHandler}
                                    value={emailValue}
                                    error={emailHasError}
                                />

                                <Input type='password' name="password" label='Password' className='bg-transparent' 
                                    onChange={passwordChangeHandler}
                                    onBlur={passwordBlurHandler}
                                    value={passwordValue}
                                    error={passwordHasError}
                                />

                                <button disabled={submitting || !validForm} className={`${submitting || !validForm ? 'btn_disable' : ''} block w-full mt-5`}>Confirm</button>
                            </Form>
                            <Link to='/register' className="border-transparent border-b-2 py-1 hover:border-[#ffbe33] duration-300">Register Now</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

export const action = async ({ request, params }) => {
    const data = await request.formData();
    const formData = {
      email: data.get('email'),
      password: data.get('password'),
    };
  
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
    const response = await fetch('http://localhost:8000/api/login', fetchOptions);
  
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
};
  

//  With axios

// export const action = async ({request, params}) => {
//     const data = await request.formData()
//     const formData = {
//         email: data.get('email'),
//         password: data.get('password')
//     }
    
//     const http = axios.create({
//         headers: {
//             'X-Requested-With': 'XMLHttpRequest',
//             "Access-Control-Allow-Credentials": "true"
//         },
//         withCredentials: true
//     })

//     await http.get('http://localhost:8000/sanctum/csrf-cookie')

//     const response = await http.post('http://localhost:8000/api/login', {
//         email: data.get('email'),
//         password: data.get('password')
//     }, {
//         headers: {
//             'X-Requested-With': 'XMLHttpRequest',
//         }
//     })
//     return 'yes'
// } 

