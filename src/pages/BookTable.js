import React, { useState, useEffect, useCallback } from "react";
import Select from 'react-select'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

import about_img from '../images/about-img.png'
import { Form, json, useActionData, useSubmit } from "react-router-dom";
import Input from "../components/UI/Input";
import Error from "../components/UI/Error";
import { success } from "../utils/sweet";
import useInput from "../hooks/use-input";

const options = [
    { value: '', label: 'How many persons?' },
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
    { value: '6', label: '6' },
    { value: '7', label: '7' },
    { value: '8', label: '8' },
]




const BookTable = () => {
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [error, setError] = useState(null)
    const {
        value: nameValue,
        changeHandler: nameChangeHandler,
        resetHandler: nameResetHandler
    } = useInput((value)  => value.trim() !== '')
    const {
        value: phoneValue,
        changeHandler: phoneChangeHandler,
        resetHandler: phoneResetHandler
    } = useInput((value)  => value.trim() !== '')
    const {
        value: emailValue,
        changeHandler: emailChangeHandler,
        resetHandler: emailResetHandler
    } = useInput((value)  => value.includes('@'))

    const submit = useSubmit()
    const data = useActionData()

    const formResetHandler = useCallback(() => {
        setDate(new Date())
        setTime(new Date())
        nameResetHandler()
        emailResetHandler()
        phoneResetHandler()
    }, [])

    useEffect(() => {
        if(data && data.status === false) {
            setError(data.message)
        }
        if(data && data.status === true) {
            console.log('hihi')
            setError(null)
            formResetHandler()
            success(data.message)
        }
    }, [data, formResetHandler])


    const dateChangeHandler = (enteredDate) => {
        setDate(enteredDate)
    }

    const timeChangeHandler = (enteredTime) => {
        setDate(enteredTime)
    }

  return (
    <div>
        <div className="container py-16">
            <div className="p-3 drop-shadow bg-white rounded-lg">
                <h1 className="text-[22px] mb-5">Book A Table</h1>
                <Error error={error}/>
                <Form method="POST">
                    <div className="grid sm:grid-cols-2 gap-x-6">
                        <Input type='text' name='name' label='Name' value={nameValue} onChange={nameChangeHandler}/>
                        <Input type='tel' name='phone' label='Phone' value={phoneValue} onChange={phoneChangeHandler}/>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-x-6">
                        <Input type='email' name='email' label='Email' value={emailValue} onChange={emailChangeHandler}/>
                        <div className="mb-3">
                            <label htmlFor="">Person</label>
                            <Select
                                styles={{
                                    control: (provided, state) => ({
                                        ...provided,
                                        height: '40px',
                                        boxShadow: state.isFocused ? "none" : "none",
                                        borderRadius: "5px",
                                        width: '100%',
                                        borderWidth: '1.5px',
                                        borderColor: state.isFocused ? "#222811b1 !important" : "#808080b9",
                                    }),
                                    option: (provided, state) => ({
                                        ...provided,
                                        // backgroundColor: state.isSelected ? "#5842e3" : "white",
                                    }),
                                }}
                                name="person"
                                className="w-full duration-300 mt-2"
                                defaultValue={options[0]}
                                options={options}
                            />
                        </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-x-6">
                        <div className="mb-3">
                            <label htmlFor="" className="mb-2 block">Date</label>
                            <DatePicker 
                                className="rounded w-full outline-none border-[1.5px] border-gray-400 h-[40px] p-2 focus:border-[#222811b1] duration-300"
                                selected={date} 
                                name='date'
                                dateFormat="yyyy-MM-dd" 
                                onChange={(date) => dateChangeHandler(date)}
                                
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="" className="mb-2 block">Time</label>
                            <DatePicker 
                                className="rounded w-full outline-none border-[1.5px] border-gray-400 h-[40px] p-2 focus:border-[#222811b1] duration-300"
                                selected={date} 
                                name='time'
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={15}
                                dateFormat="HH:mm:ss"
                                timeCaption="Time"
                                minTime={new Date().setHours(8, 0, 0)}
                                maxTime={new Date().setHours(18, 0, 0)}
                                onChange={(time) => timeChangeHandler(time)}
                            />
                        </div>
                    </div>
                    <div className="text-start mt-5">
                        <button>Confirm</button>
                    </div>
                </Form>
            </div>
        </div>
        <div className="container py-16">
            <div className="grid sm:grid-cols-2 gap-6">
                <div className="p-3">
                    <img className="w-[90%] md:w-[70%] mx-auto" src={about_img} alt="" />
                </div>
                <div className="flex flex-col justify-center">
                    <h1 className="text-[22px] mb-3">We Are CORONA</h1>
                    <p className="mb-3">
                        There are many variations of passages of Lorem Ipsum available, but
                        the majority have suffered alteration in some form, by injected
                        humour, or randomised words which don't look even slightly
                        believable. If you are going to use a passage of Lorem Ipsum, you
                        need to be sure there isn't anything embarrassing hidden in the
                        middle of text. There are many variations of passages of Lorem Ipsum
                        available, but the majority have suffered alteration in some form,
                        by injected humour, or randomised words which don't look even
                        slightly believable. If you are going to use a passage of Lorem
                        Ipsum, you need to be sure there isn't anything embarrassing hidden
                        in the middle of text.
                    </p>
                    <button>Read More</button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default BookTable;

export const action = async ({request, params}) => {
    const data = await request.formData()
    const name = data.get('name')
    const phone = data.get('phone')
    const email = data.get('email')
    const person = data.get('person')
    const date = data.get('date')
    const time = data.get('time')

    const response = await fetch('http://localhost:8000/api/book-table', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, phone, email, person, date, time})
    })    

    if(response.status === 422) {
        const resData = await response.json()
        return resData
    }

    if(!response.ok) {
        throw json({message: 'Something wrong!'}, {status: 500}) 
    }

    const resData = await response.json()
    return resData
}
