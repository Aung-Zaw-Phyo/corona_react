import React from "react";
import {MdLocationOn} from 'react-icons/md'
import {BsFillTelephoneFill} from 'react-icons/bs'
import {IoMdMail} from 'react-icons/io'
import {AiFillTwitterSquare} from 'react-icons/ai'
import {AiFillInstagram} from 'react-icons/ai'
import {AiFillFacebook} from 'react-icons/ai'
import {AiFillLinkedin} from 'react-icons/ai'

const Footer = () => {
    return (
        <footer className="bg-[#222831] text-white mt-auto">
            <div className="container grid md:grid-cols-3 gap-6 py-10">
                <div className="">
                    <h1 className="mb-4 text-[22px] text-center">Contact Us</h1>  
                    <ul className="">
                        <li className="flex justify-center items-center mb-3">
                            <MdLocationOn size={20} className="me-3"/>
                            <span>Yangon</span>
                        </li>
                        <li className="flex justify-center items-center mb-3">
                            <BsFillTelephoneFill size={20} className="me-3"/>
                            <span>09968548024</span>
                        </li>
                        <li className="flex justify-center items-center mb-3">
                            <IoMdMail size={20} className="me-3"/>
                            <span>aungzawphyo1102@gmail.com</span>
                        </li>
                    </ul>
                </div>
                <div className="text-center">
                    <h1 className="mb-4 text-[22px]">Corona</h1>  
                    <p className="mb-3 sm:w-[70%] md:w-[100%] mx-auto">
                        Necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with
                    </p>
                    <div className="flex justify-center">
                        <AiFillFacebook size={30} className="m-1"/>
                        <AiFillTwitterSquare size={30} className="m-1"/>
                        <AiFillLinkedin size={30} className="m-1"/>
                        <AiFillInstagram size={30} className="m-1"/>
                    </div>
                </div>
                <div className="">
                    <h1 className="mb-4 text-[22px] text-center">Opening Hours</h1>  
                    <ul className="">
                        <li className="flex justify-center items-center mb-3">
                            Everyday
                        </li>
                        <li className="flex justify-center items-center mb-3">
                            10.00 Am -10.00 Pm
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
