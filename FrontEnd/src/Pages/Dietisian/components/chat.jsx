import { NavLink } from "react-router-dom";
import senyum from '/icon/smile.png';
import pesawat from '/icon/plane.png';
import { useState } from "react";

const data = ["ABCD", "ABCD", "ABCD", "ABCD", "ABCD", "ABCD", "ABCD", "ABCD", "ABCD", "ABCD", "ABCD"]
const text= ["A:ABCDEFGHIJKLM", "A:ABCDEFGHIJKLMNOPQRSTUVWXZdk lajlbwjdgakjhakfdyh fadkyuafdhjfjfdadjkd abjkwdvjkaldjagdka", "B:ABCDEFGH", "A:ABCDEFGHIJKLMNOPQRSTUVWXZ", "B:ABCDEFGHIJKLMNOPQRSTUVWXZ", "B:ABCDEFGHIJKLMNOPQRSTUVWXZ", "B:ABCDEFGHIJKLMNOPQRSTUVWXZ", "B:ABCDEFGHIJKLMNOPQRSTUVWXZ", "B:ABCDEFGHIJKLMNOPQRSTUVWXZ", "B:ABCDEFGHIJKLMNOPQRSTUVWXZ", "B:ABCDEFGHIJKLMNOPQRSTUVWXZ", "B:ABCDEFGHIJKLMNOPQRSTUVWXZ", "B:ABCDEFGHIJKLMNOPQRSTUVWXZ", "B:ABCDEFGHIJKLMNOPQRSTUVWXZ", "B:ABCDEFGHIJKLMNOPQRSTUVWXZ", "B:ABCDEFGHIJKLMNOPQRSTUVWXZ", "B:ABCDEFGHIJKLMNOPQRSTUVWXZ", "B:ABCDEFGHIJKLMNOPQRSTUVWXZ", "B:ABCDEFGHIJKLMNOPQRSTUVWXZ"];

function Chart() {
    const [chatActive, setChatActive] = useState("group");

    return (
        <>
            <div className="w-full h-full flex">
                <div className="w-8/12 h-full flex py-10 px-8">
                    <div className="w-full h-full flex flex-col bg-white rounded-3xl ">
                        <div className="w-full h-full flex flex-col justify-start px-14 py-12">
                            <div className="h-12 flex items-center gap-x-4">
                                <img src="" className="w-12 h-full border border-black rounded-full"/>
                                <p className="text-lg font-medium">Mitoo.json</p>
                            </div>
                            <div className="w-full h-5/6 flex flex-col pt-8 gap-y-1.5 overflow-y-auto px-4">
                                {text.map((item, idx) => {
                                    const temp = item.split(":");
                                    if(temp[0] === "A"){
                                        return (
                                            <div key={idx} className="w-full flex justify-start">
                                                <p className="max-w-lg bg-gray-200 rounded-lg px-4 py-2">{temp[1]}</p>
                                            </div>
                                        )
                                    }else{
                                        return (
                                            <div key={idx} className="w-full flex justify-end">
                                                <p className="max-w-lg bg-hehe rounded-lg px-4 py-2 text-end">{temp[1]}</p>
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                            <div className="w-full h-12 flex justify-center items-center bg-gray-200 rounded-xl mt-4">
                                <button className="w-1/12 h-full flex items-center justify-center">
                                    <img src={senyum} className="h-1/2" />
                                </button>
                                <input type="text" className="w-10/12 h-full bg-transparent border-none outline-none text-lg" placeholder="Write here..."/>
                                <button className="w-1/12 h-full flex items-center justify-center">
                                    <img src={pesawat} className="h-1/2" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-4/12 h-full flex flex-col py-10 px-8">
                    <div className="w-full h-full bg-white rounded-3xl py-10 px-10">
                        <form action="" className="w-full h-12">
                            <input type="search" className="w-full h-full bg-gray-200 rounded-2xl px-3" placeholder=" Search" />
                        </form>
                        <div className="w-full h-12 flex justify-around items-center">
                            <button className={`text-xl text-rose-800 ${chatActive === "group" ? "underline" : "" }`} onClick={() => setChatActive("group")}>Group</button>
                            <button className={`text-xl text-rose-800 ${chatActive === "doctor" ? "underline" : "" }`} onClick={() => setChatActive("doctor")}>Doctor</button>
                        </div>
                        <hr className="text-rose-800 border-2 border-rose-800 opacity-30"/>
                        <div className="w-full h-5/6 flex flex-col overflow-y-auto gap-y-4 mt-8">
                            {data.map((item, idx) => (
                                <div key={idx} className="w-full h-20 flex items-center">
                                    <div className="w-1/6 h-full flex items-center">
                                        <img src="" className="w-12 h-12 border border-black rounded-full"/>
                                    </div>
                                    <div className="w-5/6 h-full flex flex-col items-start justify-center pb-1">
                                        <p className="w-full text-lg font-medium">{item}</p>
                                        <p className="w-full text-sm truncate">{item}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Chart;