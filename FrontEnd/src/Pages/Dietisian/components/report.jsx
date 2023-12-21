import WeightLose from "../script/WeightLose";
import DailyReport from "../script/DailyReport";
import { useEffect } from "react";



function Report() {

    useEffect(() => {
        let state = false;

        if(!state){
            WeightLose();
            DailyReport();
        }

        return () => {
            state = true;
        };
    }, []);
    return (
        <>
            <div className="w-full h-full flex">
                <div className="w-8/12 flex flex-col justify-center items-center gap-y-6 py-10 ps-12 pe-4">
                    <div className="w-full h-1/2 bg-white rounded-3xl py-14 px-16">
                        <h1 className="text-4xl">CALORIES PER DAY</h1>
                        <div className="max-w-3xl max-h-1 h-full w-full rounded-lg">
                            <div className="flex justify-between pb-4 mb-4 border-b ">
                                <div className="flex items-center">
                                <div>
                                    <p className="text-m font-normal text-gray-500 400">congrats you lose 780cal today!</p>
                                </div>
                                </div>
                            </div>

                            <div id="column-chart"></div>
                                <div className="grid grid-cols-1 items-center border-gray-200 border-t y-700 justify-between">
                                <div className="flex justify-between items-center pt-5">
                                    <a
                                    href="#"
                                    className="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-blue-600 hover:text-blue-700 -blue-500  hover:bg-gray-100 ray-700 -gray-700 y-700 px-3 py-2">
                                    More 
                                    <svg className="w-2.5 h-2.5 ms-1.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                                    </svg>
                                    </a>
                                </div>
                                </div>
                            </div>
                                
                    </div>
                    <div className="w-full h-1/2 bg-white rounded-3xl py-5 px-16">
                        <h1 className="text-4xl">WEIGHT LOST</h1>
                        <div className="max-w-sm w-full">
                        <div className="flex justify-between items-start w-full">
                        </div>
                        <div className="py-6" id="pie-chart"></div>
                        <div className="grid grid-cols-1 items-center border-gray-200 border-t  justify-between">

                        </div>
                        </div>

                    </div>
                </div>
                <div className="w-4/12 h-full flex py-10 pe-12">
                    <div className="w-full h-full bg-white rounded-3xl py-12 px-16">
                        <h1 className="text-4xl">REMINDER</h1>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Report;