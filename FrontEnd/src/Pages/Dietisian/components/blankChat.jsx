import acc from '/icon/user.png';
import senyum from '/icon/smile.png';
import pesawat from '/icon/plane.png';
import { useState, useEffect } from "react";
import DietisianService from "../../../Services/Dietisian/dietisian";
import DoctorService from '../../../Services/konsultan/doctor';
import ChatService from '../../../Services/Chat/chat';
import { Link } from 'react-router-dom';

const token = localStorage.getItem("token");

function Chat() {
    const [chatActive, setChatActive] = useState("group");
    const [user, setUser] = useState('');

    const [listRoom, setListRoom] = useState([]);

    const getUser = async() => {
        const res = await DietisianService.getUserLogin(token);
        if(res.status == 200){
            setUser(res.data.data.username);
            getRooms(res.data.data.username); 
        } else {
            if (res.data.message == "user not found"){
                const res2 = await DoctorService.getUserLogin(token);
                
                if (res2.status == 200){
                    setUser(res2.data.data.username);
                    getRooms(res2.data.data.username);
                }
            }
        }
    }

    const getRooms = async(data) => {
        const result = await ChatService.getRooms(data);
        setListRoom([...result.data]);
    }

    const splitUser = (item) => {
        if(item.name != ""){
            return item.name;    
        }
        
        const temp = item.username.split(",");
        if(temp[0] === user){
            return temp[1];
        }else{
            return temp[0];
        }
    }

    useEffect(() => {
        setListRoom([]);
        getUser();
        // getRooms();
    }, [])

    return (
        <>
            <div className="w-full h-full flex">
                <div className="w-8/12 h-full flex py-10 px-8">
                    <div className="w-full h-full flex flex-col bg-white rounded-3xl ">
                        <div className="w-full h-full flex flex-col justify-start px-14 py-12">
                            <div className="h-12 flex items-center gap-x-4">
                                <img src={acc} className="w-12 h-full border-2 border-black rounded-full"/>
                            </div>
                            <div className="w-full h-5/6 flex flex-col pt-8 gap-y-1.5 overflow-y-auto px-4">

                            </div>
                            <div className="w-full h-12 flex justify-center items-center bg-gray-200 rounded-xl mt-4" disabled>
                                <button className="w-1/12 h-full flex items-center justify-center" disabled>
                                    <img src={senyum} className="h-1/2" />
                                </button>
                                <input type="text" className="w-10/12 h-full bg-transparent border-none outline-none text-lg" placeholder="Write here..." disabled/>
                                <button className="w-1/12 h-full flex items-center justify-center" disabled>
                                    <img src={pesawat} className="h-1/2" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-4/12 h-full flex flex-col py-10 px-8">
                    <div className="w-full h-full bg-white rounded-3xl py-10 px-10">
                        <div className="w-full h-12">
                            <input type="search" className="w-full h-full bg-gray-200 rounded-2xl px-3" placeholder=" Search" />
                        </div>
                        <div className="w-full h-12 flex justify-around items-center">
                            <button className={`text-xl text-rose-800 ${chatActive === "group" ? "underline" : "" }`} onClick={() => setChatActive("group")}>Group</button>
                            <button className={`text-xl text-rose-800 ${chatActive === "doctor" ? "underline" : "" }`} onClick={() => setChatActive("doctor")}>Doctor</button>
                        </div>
                        <hr className="text-rose-800 border-2 border-rose-800 opacity-30"/>
                        <div className="w-full h-5/6 flex flex-col overflow-y-auto gap-y-4 mt-8">
                            {listRoom.map((item, idx) => (
                                <Link key={idx} className="w-full h-20 flex items-center" to={`/dietisian/chat/${item.room_id}`}>
                                    <div className="w-1/6 h-full flex items-center">
                                        <img src={acc} className="w-12 h-12 border border-black rounded-full"/>
                                    </div>
                                    <div className="w-5/6 h-full flex items-center justify-start pb-1">
                                        <p className="w-full text-start text-lg font-medium">{splitUser(item)}</p>
                                        {/* <p className="w-full text-sm truncate">{item}</p> */}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Chat;