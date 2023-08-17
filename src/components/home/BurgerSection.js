import React from "react";
import { Link } from "react-router-dom";

const BurgerSection = (props) => {
    return (
        <div className="container py-16 bg-[#eeeeee66]  rounded-lg mb-6">
        <div className="grid md:grid-cols-2 gap-6">
            <div className="p-3 flex flex-col justify-center">
                <h1 className="text-[22px] mb-3">Delicious Burger</h1>
                <p className="mb-3">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti, aut itaque modi quia velit pariatur cupiditate commodi debitis exercitationem ipsa vitae maiores error eaque eligendi eos inventore libero quibusdam sit!
                </p>
                <p className="mb-3">
                    Corrupti, aut itaque modi quia velit pariatur cupiditate commodi debitis exercitationem ipsa vitae maiores .
                </p>
                <Link to='/menu'><button className="">See More</button></Link>
            </div>
            <div className="p-3">
                <img className="lg:w-[80%] mx-auto" src={props.img} alt="" />
            </div>
        </div>
    </div>
    );
};

export default BurgerSection;
