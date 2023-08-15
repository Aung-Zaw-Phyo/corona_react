import React from "react";
import about_img from '../images/about-img.png'

const About = () => {
  return (
    <div className="container py-16">
        <div className="grid sm:grid-cols-2 gap-6">
            <div className="p-3">
                <img className="w-[90%] md:w-[70%] mx-auto" src={about_img} alt="" />
            </div>
            <div className="flex flex-col justify-center">
                <h1 className="text-[22px] mb-3">
                    We Are CORONA
                </h1>
                <p className="mb-3">
                There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.
                There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.
                </p>
                <button>Read More</button>
            </div>
        </div>
    </div>
  );
};

export default About;
