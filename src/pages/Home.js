import React from "react";
import hero_img from "../images/hero-bg.jpg";
import burger_img from '../images/burger.png'
import pizza_img from '../images/pizza.png'
import pasta_video from '../images/pasta.mp4'

const Home = () => {
    return (
        <>
            <div className="w-full h-screen flex items-center bg-[#EDF2F6]">
                <img className="w-full h-full object-cover" src={hero_img} alt="" />
            </div>
            <div className="container py-16 ">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-3 flex flex-col justify-center">
                        <h1 className="text-[22px] mb-3">Delicious Burger</h1>
                        <p className="mb-3">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti, aut itaque modi quia velit pariatur cupiditate commodi debitis exercitationem ipsa vitae maiores error eaque eligendi eos inventore libero quibusdam sit!
                        </p>
                        <button className="">See More</button>
                    </div>
                    <div className="p-3">
                        <img className="lg:w-[80%] mx-auto" src={burger_img} alt="" />
                    </div>
                </div>
            </div>
            <div className="bg-[#eeeeee36]">
                <div className="container py-16 ">
                    <img className="w-full md:w-[80%] mx-auto" src={pizza_img} alt="" />
                </div>
            </div>
            <div className="container py-16">
                <div className="grid grid-cols-2">
                    <div>
                        <h1 className="text-[22px] mb-3">Best Delicious Pasta</h1>
                        <p className="mb-3">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti, aut itaque modi quia velit pariatur cupiditate commodi debitis exercitationem ipsa vitae maiores error eaque eligendi eos inventore libero quibusdam sit!
                        </p>
                        <p className="mb-3">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti, aut itaque modi quia velit pariatur cupiditate commodi debitis exercitationem ipsa vitae maiores error eaque eligendi eos inventore libero quibusdam sit!
                        </p>
                        <button className="">See More</button>
                    </div>
                    <video className="w-screen" src={pasta_video} controls autoPlay loop></video>
                </div>
            </div>

        </>
    );
};

export default Home;
