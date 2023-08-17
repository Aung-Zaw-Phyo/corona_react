import React from "react";

const HeroSection = (props) => {
    return (
        <div className="w-full h-screen flex items-center bg-[#EDF2F6]">
        <img className="w-full h-full object-cover" src={props.img} alt="" />
    </div>
    );
};

export default HeroSection;
