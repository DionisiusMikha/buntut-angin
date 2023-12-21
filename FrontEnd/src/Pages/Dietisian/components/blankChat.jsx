import acc from '/icon/user.png';
import { useState, useEffect } from "react";
import DietisianService from "../../../Services/Dietisian/dietisian";
import ChatService from '../../../Services/Chat/chat';
import { Link } from 'react-router-dom';


function Chat() {
    const token = localStorage.getItem("token");
    const [chatActive, setChatActive] = useState("group");
    const [user, setUser] = useState('');
    const [search, setSearch] = useState("");
    const [listRoom, setListRoom] = useState([]);

    const getUser = async() => {
        const res2 = await DietisianService.getUserLogin(token);
        if (res2.status == 200){
            setUser(res2.data.data.username);
            getRooms(res2.data.data.username, search);
        }
    }

    const getRooms = async(username) => {
        const result = await ChatService.getRoomsUser(username, search);
        console.log(result.data);
        if (result.status == 200){
            setListRoom(result.data);
        }
    }

    useEffect(() => {
        setListRoom([]);
        getUser();
    }, [])

    useEffect(() => {
        getUser();
    }, [search]);

    return (
        <>
            <div className="w-full h-full flex">
                <div className="w-8/12 h-full flex py-10 px-8">
                    <div className="w-full h-full flex flex-col bg-white rounded-3xl ">
                        <div className="w-full h-full flex flex-col items-center justify-center text-3xl font-semibold">
                            Wait for consultant to start conversation
                        </div>
                    </div>
                </div>
                <div className="w-4/12 h-full flex flex-col py-10 px-8">
                    <div className="w-full h-full bg-white rounded-3xl py-10 px-10">
                        <div className="w-full h-12">
                            <input type="search" className="w-full h-full bg-gray-200 rounded-2xl px-3" placeholder=" Search" onChange={(e)=>{
                                setSearch(e.target.value);
                            }}/>
                        </div>
                        <hr className="text-rose-800 border-2 border-rose-800 opacity-30 my-5"/>
                        <div className="w-full h-5/6 flex flex-col overflow-y-auto">
                            {listRoom.map((item, idx) => (
                                <Link key={idx} className="w-full h-20 flex items-center" to={`/dietisian/chat/${item.room_id}`}>
                                    <div className="w-1/6 h-full flex items-center">
                                        <img src={acc} className="w-12 h-12 border border-black rounded-full"/>
                                    </div>
                                    <div className="w-5/6 h-full flex items-center justify-start pb-1">
                                        <p className="w-full text-start text-lg font-medium ms-5">{item.username_doctor}</p>
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