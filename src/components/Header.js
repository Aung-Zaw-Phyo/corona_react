import React, { useEffect, useState } from "react";
import {NavLink, Link, useLocation} from 'react-router-dom'
import {RxHamburgerMenu} from 'react-icons/rx'
import {FaUser} from 'react-icons/fa'
import {FaShoppingCart} from 'react-icons/fa'
import {IoMdClose} from 'react-icons/io'
import {CSSTransition} from 'react-transition-group'
import { useDispatch, useSelector } from "react-redux";
import {uiActions} from '../store/ui-slice'
import { getToken } from "../utils/auth";

const timingDuration = {
    enter: 300,
    exit: 300,
  };


const Backdrop = (props) => {
    return <div onClick={props.onShowChange} className=" h-screen w-screen fixed top-0 bottom-0 bg-[#3333335d] z-20"/>
}

const MobileNav = (props) => {
    return (
        <CSSTransition
            in={props.onShowStatus}
            timeout={timingDuration}
            mountOnEnter
            unmountOnExit
            classNames={{ 
                enter: '',
                enterActive: 'translate-x-0 duration-300',
                exit: '',
                exitActive: '-translate-x-full duration-300',
            }}
        >
            <header className="h-screen w-[260px] md:w-[280px] left-0 fixed top-0 bottom-0 bg-white z-30 p-3">
                <div className="flex justify-end pr-3">
                    <IoMdClose onClick={props.onShowChange} size={35} className="text-[#3339] hover:text-[#333] duration-300 cursor-pointer"/>
                </div>
                <ul className="mt-16 text-end pr-3 text-[18px]">
                    <li className="py-3">
                        <NavLink to='/' className={({isActive}) => isActive ? 'p-1 px-3 text-[#ffbe33]': 'p-1 px-3 '}>Home</NavLink>
                    </li>
                    <li className="py-3">
                        <NavLink to='/menu' className={({isActive}) => isActive ? 'p-1 px-3 text-[#ffbe33]': 'p-1 px-3 '}>Menu</NavLink>
                    </li>
                    <li className="py-3">
                        <NavLink to='/about' className={({isActive}) => isActive ? 'p-1 px-3 text-[#ffbe33]': 'p-1 px-3 '}>About</NavLink>
                    </li>
                    <li className="py-3">
                        <NavLink to='/book-table' className={({isActive}) => isActive ? 'p-1 px-3 text-[#ffbe33]': 'p-1 px-3 '}>Book Table</NavLink>
                    </li>
                    {
                        getToken() && 
                        <li className="py-3 text-end">
                            <NavLink to='/profile' className={({isActive}) => isActive ? 'p-1 px-3 text-[#ffbe33]': 'p-1 px-3 '}>Profile</NavLink>
                        </li>
                    }
                                        {
                        !getToken() && 
                        <li className="py-2 px-3 text-end">
                            <span className="group">
                                <NavLink to='login' className='border-2 border-transparent group-hover:border-b-[#ffbe33] py-1 duration-300' >Login</NavLink>
                                <span className="h-[2px] w-[100px] bg-[#ffbe33] scale-0 mx-auto group-hover:scale-110 duration-300" />
                            </span>
                        </li>
                    }
                    {
                        getToken() && 
                        <li className="py-3">
                            <Link to='/order' className="ml-8 bg-[#ffbe33] hover:bg-[#ffbe33d2] p-1 px-2 rounded text-white">Online Orders</Link>
                        </li>
                    }
                </ul>
            </header>
        </CSSTransition>
    )
}

const Header = () => {
    const totalQuantity = useSelector(state => state.cart.totalQuantity)
    const [isOver, setIsOver] = useState(false);
    const [isShowMobileNav, setIsShowMobileNav] = useState(false)
    const location = useLocation()
    const isHome = location.pathname === '/'

    const dispatch = useDispatch()

    const cartIsShowChangeHandler = () => {
        dispatch(uiActions.cartShowChangeHandler())
    }

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 500 && isOver === false) {
                setIsOver(true);
            }
            if (window.scrollY < 500 && isOver === true) {
                setIsOver(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isOver]);

    const showMobileNavChangeHandler = () => {
        setIsShowMobileNav((prevState) => !prevState)
    }

    return (
        <>
            <MobileNav 
                onShowStatus={isShowMobileNav} 
                onShowChange={showMobileNavChangeHandler} 
                onCartChangeHandler={cartIsShowChangeHandler} 
                totalQuantity={totalQuantity}
            />
            {
                isShowMobileNav && <Backdrop onShowChange={showMobileNavChangeHandler} />
            }

            <header className={`${isHome ? 'text-white border-[0px]' : 'bg-[#fff] text-[#333] border-[.1px]'} drop-shadow-lg py-4 absolute top-0 right-0 left-0 bg-transparent border-x-0 border-t-0 z-10`}>
                <div className="container flex justify-between items-center ">
                    <h1 className="text-[24px] font-sans"><Link to='/'>CORONA</Link></h1>
                    <div className="flex items-center p-1 cursor-pointer lg:hidden">
                        <span onClick={cartIsShowChangeHandler} className='block mr-8 relative cursor-pointer'>
                            <FaShoppingCart size={23}/> 
                            <span className=" absolute top-[-10px] right-[-20px] p-1 flex justify-center items-center w-[20px] h-[20px] bg-[#ffbe33] text-white font-bold rounded-full text-center ">{totalQuantity}</span>
                        </span>
                        <RxHamburgerMenu onClick={showMobileNavChangeHandler} size={30}/>
                    </div>
                    <ul className="hidden lg:flex text-[18px]">
                        <li className="">
                            <NavLink to='/' className={({isActive}) => isActive ? 'p-1 px-3 text-[#ffbe33]': 'p-1 px-3 '}>Home</NavLink>
                        </li>
                        <li className="">
                            <NavLink to='/menu'  className={({isActive}) => isActive ? 'p-1 px-3 text-[#ffbe33]': 'p-1 px-3 '}>Menu</NavLink>
                        </li>
                        <li className="">
                            <NavLink to='/about'  className={({isActive}) => isActive ? 'p-1 px-3 text-[#ffbe33]': 'p-1 px-3 '}>About</NavLink>
                        </li>
                        <li className="">
                            <NavLink to='/book-table'  className={({isActive}) => isActive ? 'p-1 px-3 text-[#ffbe33]': 'p-1 px-3 '}>Book Table</NavLink>
                        </li>
                    </ul>
                    <div className="hidden lg:flex lg:items-center">
                        {
                            getToken() &&
                            <NavLink to='/profile' className='block ml-5'><FaUser size={23}/></NavLink>
                        }
                        {
                            !getToken() && 
                            <span className=" group">
                                <NavLink to='login' >Login</NavLink>
                                <div className="h-[2px] w-[100%] bg-[#ffbe33] scale-0 mx-auto group-hover:scale-110 duration-300" />
                            </span>
                        }
                        <span onClick={cartIsShowChangeHandler} className='block ml-5 relative cursor-pointer'>
                            <FaShoppingCart size={23}/> 
                            <span className=" absolute top-[-10px] right-[-20px] p-1 flex justify-center items-center w-[20px] h-[20px] bg-[#ffbe33] text-white font-bold rounded-full text-centerm ">{totalQuantity}</span>
                        </span>
                        {
                            getToken() &&
                            <Link to='/order' className="ml-8 bg-[#ffbe33] hover:bg-[#ffbe33d2] p-1 px-2 rounded text-white ">Online Orders</Link>
                        }
                    </div>
                </div>
            </header>
            <header className={`${isOver ? 'translate-y-0' : ' translate-y-[-120%]'} drop-shadow-lg py-4 fixed top-0 right-0 left-0 bg-[#fffffff0] text-[#333] duration-300 z-10`}>
                <div className="container flex justify-between items-center ">
                    <h1 className="text-[24px] font-sans"><Link to='/'>CORONA</Link></h1>
                    <div className="flex items-center p-1 cursor-pointer lg:hidden">
                        <span onClick={cartIsShowChangeHandler} className='block mr-8 relative cursor-pointer'>
                            <FaShoppingCart size={23}/> 
                            <span className=" absolute top-[-10px] right-[-20px] p-1 flex justify-center items-center w-[20px] h-[20px] bg-[#ffbe33] text-white font-bold rounded-full text-center ">{totalQuantity}</span>
                        </span>
                        <RxHamburgerMenu onClick={showMobileNavChangeHandler} size={30}/>
                    </div>
                    <ul className="hidden lg:flex text-[18px]">
                        <li className="">
                            <NavLink to='/' className={({isActive}) => isActive ? 'p-1 px-3 text-[#ffbe33]': 'p-1 px-3 '}>Home</NavLink>
                        </li>
                        <li className="">
                            <NavLink to='/menu' className={({isActive}) => isActive ? 'p-1 px-3 text-[#ffbe33]': 'p-1 px-3 '}>Menu</NavLink>
                        </li>
                        <li className="">
                            <NavLink to='/about' className={({isActive}) => isActive ? 'p-1 px-3 text-[#ffbe33]': 'p-1 px-3 '}>About</NavLink>
                        </li>
                        <li className="">
                            <NavLink to='/book-table' className={({isActive}) => isActive ? 'p-1 px-3 text-[#ffbe33]': 'p-1 px-3 '}>Book Table</NavLink>
                        </li>
                    </ul>
                    <div className="hidden lg:flex lg:items-center">
                        {
                            getToken() &&
                            <NavLink to='/profile' className='block ml-5'><FaUser size={23}/></NavLink>
                        }
                        {
                            !getToken() && 
                            <span className=" group">
                                <NavLink to='login' >Login</NavLink>
                                <div className="h-[2px] w-[100%] bg-[#ffbe33] scale-0 mx-auto group-hover:scale-110 duration-300" />
                            </span>
                        }
                        <span onClick={cartIsShowChangeHandler} className='block ml-5 relative cursor-pointer'>
                            <FaShoppingCart size={23}/> 
                            <span className=" absolute top-[-10px] right-[-20px] p-1 flex justify-center items-center w-[20px] h-[20px] bg-[#ffbe33] text-white font-bold rounded-full text-centerm ">{totalQuantity}</span>
                        </span>
                        {
                            getToken() && 
                            <Link to='/order' className="ml-8 bg-[#ffbe33] hover:bg-[#ffbe33d2] p-1 px-2 rounded text-white">Online Orders</Link>
                        }
                    </div>
                </div>
            </header>
            {
                !isHome && <div className="py-8"></div>
            }
        </>
    );
};

export default Header;
