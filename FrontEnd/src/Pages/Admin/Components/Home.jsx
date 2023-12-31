import { useEffect } from "react";
import loadSubscription from "../script/Subscriptions.js";
import loadWebAnalytics from "../script/WebAnalytics.js"

function Home() {
    
    useEffect(() => {
        let state = false;

        if(!state){
            loadWebAnalytics();
            loadSubscription();
        }

        return () => {
            state = true;
        };
    }, []);

    return (
        <>
           <div className="flex flex-col justify-evenly mt-3 mx-5">
                <div className="bg-white w-full mt-8 h-full rounded-xl drop-shadow-md px-5 py-5">
                    <div className="text-3xl font-semibold">Subscriptions</div>
                    <div className="max-w-xxxl w-full bg-white rounded-lg shadow -800 md-6 p-1">
                        <div className="flex justify-between border-gray-200 border-b -700 pb-3">
                            <dl>
                            <dt className="text-base font-normal text-gray-500 -400 pb-1">Profit</dt>
                            <dd className="leading-none text-3xl font-bold text-gray-900 ">Rp. 170.000</dd>
                            </dl>
                            <div>
                            <span className="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md -900 -300">
                                <svg className="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13V1m0 0L1 5m4-4 4 4"/>
                                </svg>
                                Profit rate 23.5%
                            </span>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 py-3">
                            <dl>
                            <dt className="text-base font-normal text-gray-500 -400 pb-1">New Subscription</dt>
                            <dd className="leading-none text-xl font-bold text-green-500 -400">4 User</dd>
                            </dl>
                            <dl>
                            <dt className="text-base font-normal text-gray-500 -400 pb-1">Lose Subscription</dt>
                            <dd className="leading-none text-xl font-bold text-red-600 -500">2 User</dd>
                            </dl>
                        </div>
                        <div id="bar-chart"></div>
                            <div className="grid grid-cols-1 items-center border-gray-200 border-t -700 justify-between">
                            <div className="flex justify-between items-center pt-5">
                                <button
                                id="dropdownDefaultButton"
                                data-dropdown-toggle="lastDaysdropdown"
                                data-dropdown-placement="bottom"
                                className="text-sm font-medium text-gray-500 -400 hover:text-gray-900 text-center inline-flex items-center -white"
                                type="button">
                                Last 3 months
                                <svg className="w-2.5 m-2.5 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                                </svg>
                                </button>
                                <div id="lastDaysdropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 -700">
                                    <ul className="py-2 text-sm text-gray-700 -200" aria-labelledby="dropdownDefaultButton">
                                    <li>
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 -gray-600 -white">Yesterday</a>
                                    </li>
                                    <li>
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 -gray-600 -white">Today</a>
                                    </li>
                                    <li>
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 -gray-600 -white">Last 7 days</a>
                                    </li>
                                    <li>
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 -gray-600 -white">Last 30 days</a>
                                    </li>
                                    <li>
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 -gray-600 -white">Last 90 days</a>
                                    </li>
                                    <li>
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 -gray-600 -white">Last 6 months</a>
                                    </li>
                                    <li>
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 -gray-600 -white">Last year</a>
                                    </li>
                                    </ul>
                                </div>
                                <a
                                href="#"
                                className="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-blue-600 hover:text-blue-700 -blue-500  hover:bg-gray-100 -gray-700 -gray-700 -700 px-3 py-2">
                                Subscription Report
                                <svg className="w-2.5 h-2.5 ms-1.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                                </svg>
                                </a>
                            </div>
                            </div>
                        </div>
                </div>
                <div className="bg-white w-full mt-8 h-full p rounded-xl drop-shadow-md px-5 py-9">
                    <div className="text-3xl font-semibold">Web Analytics</div>
                    <div className="max-w-xxxxl w-full h-fit bg-white rounded-lg shadow -800 p-4 md:p-6">
                        <div className="flex justify-between">
                            <div>
                            <h5 className="leading-none text-3xl font-bold text-gray-900  pb-2">1.208</h5>
                            <p className="text-base font-normal text-gray-500 -400">Users this week</p>
                            </div>
                            <div
                            className="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 -500 text-center">
                            12%
                            <svg className="w-3 h-3 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13V1m0 0L1 5m4-4 4 4"/>
                            </svg>
                            </div>
                        </div>
                        <div id="area-chart"></div>
                        <div className="grid grid-cols-1 items-center border-gray-200 border-t justify-between h-1">
                        </div>

                        </div>
                </div>
           </div>
        </>
        
    )
}



export default Home;