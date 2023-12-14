import menu from "/icon/menu.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import iconUser from "/icon/user.png";
import DietisianService from "../../../Services/Dietisian/dietisian";
import WeightLose from "../script/WeightLose";

function Home() {
    const [user, setUser] = useState ({});
    const navigate = useNavigate();

    const cariUser = async() => {
        const token = localStorage.getItem("token");
        if(!token){
            navigate("/login");
        } else {
            try {
                const res = await DietisianService.getUserLogin(token);
                if (res.status == 200){
                    setUser(res.data.data);
                } else {
                    navigate("/login");
                }
                } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        let state = false;

        if(!state){
            WeightLose();
        }
        cariUser();

        return () => {
            state = true;
        };
    }, []);

    return (
        <>
            <div className="w-full h-full flex">
                <div className="w-8/12 h-full">
                    <div className="w-full h-2/4 px-8 pt-10">
                        <div className="w-full h-full bg-white rounded-3xl py-10 px-12">
                            <h1 className="text-4xl">Daily Report</h1>
                        </div>
                    </div>
                    <div className="w-full h-auto px-8 pt-10 flex gap-x-8">
                        <div className="w-1/2 h-full mb-10 bg-white rounded-3xl py-6 px-8">
                            <h1 className="text-2xl font-medium">Weight Loss</h1>
                            <div className="max-w-sm w-ful">
                        <div className="flex justify-between items-start w-full">
                        </div>
                        <div className="py-6" id="pie-chart"></div>
                        <div className="grid grid-cols-1 items-center border-gray-200 border-t  justify-between">
                            <div className="flex justify-between items-center pt-5">
                            <a
                                href="/dietisian/report"
                                className="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-blue-600 hover:text-blue-700 -500  hover:bg-gray-100 -700 -700  px-3 py-2">
                                More
                                <svg className="w-2.5 h-2.5 ms-1.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                                </svg>
                            </a>
                            </div>
                        </div>
                        </div>
                        </div>
                        <div className="w-1/2 h-auto bg-white rounded-3xl py-6 px-8 mb-10">
                            <h1 className="text-2xl font-medium">Consult</h1>
                        </div>
                    </div>
                </div>
                {/* profile */}
                <div className="w-4/12 bg-green-200 py-10 px-3 h-full">
                    <div className="flex flex-row justify-between items-center mx-8">
                        <div className="text-3xl font-semibold">PROFILE</div>
                        <button className="border border-gray-500 rounded-full p-2" onClick={()=>{
                        navigate("/dietisian/profile");
                        }}>
                        <img src={menu} width="30px" alt="" />
                        </button>
                    </div>
                    {/* profile detail */}
                    <div className="w-32 flex flex-col justify-center items-center m-auto pt-10">
                        {user.profile_picture ? <img src={user.profile_picture} alt="ADA" /> : <img src={iconUser} alt="KOSONG" />}
                    </div>
                    <div className="text-center text-xl font-semibold py-3 uppercase">{user.display_name}</div>
                    <div className="mx-8">
                        <hr className="border border-gray-300 w-full my-6"/>
                        <div className="flex flex-row justify-center items-center">
                        <div className="w-1/3 flex flex-col justify-center items-center">
                            <span className="uppercase font-semibold text-black text-xl">{user.weight}KG</span>
                            <span className="uppercase font-semibold text-gray-500">weight</span>
                        </div>
                        <div className="w-1/3 flex flex-col justify-center items-center">
                            <span className="uppercase font-semibold text-black text-xl">{user.height}CM</span>
                            <span className="uppercase font-semibold text-gray-500">height</span>
                        </div>
                        <div className="w-1/3 flex flex-col justify-center items-center">
                            <span className="uppercase font-semibold text-black text-xl">{user.age}</span>
                            <span className="uppercase font-semibold text-gray-500">age</span>
                        </div>
                        </div>
                        <hr className="border border-gray-300 w-full my-6"/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;