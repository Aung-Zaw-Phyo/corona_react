import React from "react";

const PizzaSection = (props) => {
    return  (
        <div className="">
            <div className="container py-16 ">
                <h1 className="text-[22px] mb-2 text-center">Best Delicious Pizza</h1>
                <div className="h-[2px] w-[100px] bg-[#ffbe33] mx-auto" />
                <img className="w-full md:w-[75%] mx-auto" src={props.img} alt="" />
            </div>
        </div>
    );
};

export default PizzaSection;
