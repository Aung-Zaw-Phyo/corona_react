import React from "react";
import { Link } from "react-router-dom";

const PastaSection = (props) => {
  return (
    <div className="container py-16 bg-[#eeeeee66] rounded-lg mb-6">
        <div className="grid grid-cols-2">
            <div>
                <h1 className="text-[22px] mb-3">Best Delicious Pasta</h1>
                <p className="mb-3">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti, aut itaque modi quia velit pariatur cupiditate commodi debitis exercitationem ipsa vitae maiores error eaque eligendi eos inventore libero quibusdam sit!
                </p>
                <p className="mb-3">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti, aut itaque modi quia velit pariatur cupiditate commodi debitis exercitationem ipsa vitae maiores error eaque eligendi eos inventore libero quibusdam sit!
                </p>
                <Link to='/menu'><button className="">See More</button></Link>
            </div>
            <video className="w-screen" src={props.video} controls autoPlay loop></video>
        </div>
    </div>
  );
};

export default PastaSection;
