import React, { useState } from "react";
import Lottie from "lottie-react";
import threeDots from "../animation/three-dots.json";
import success from "../animation/success.json";

const Loader = () => {
    const [route, setRoute] = useState("loading")
    function timer(){
        setTimeout(() => {
            setRoute("registersuccess")
        }, 5000);
    }
    function timer2(){
        setTimeout(() => {
            window.location.href = "/dietisian/";
        }, 3000);
    }

    return <>
        {route=="loading"?
            <div className="w-full h-screen">
                <Lottie className="h-screen -m-10 w-full pr-20" animationData={threeDots} loop={true} />
                {timer()}
            </div> 
            : 
            <div className="w-1/2 flex flex-col -m-52 mx-auto px-40 justify-center items-center h-screen bg-white">
                <Lottie className="h-screen mx-auto" animationData={success} loop={true} />
                <div className="font-bold text-6xl -my-40">Register Succesfull</div>
                {timer2()}
            </div> 
        }
    </>
};

export default Loader;