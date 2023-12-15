import acc from '/icon/user.png';
import senyum from '/icon/smile.png';
import pesawat from '/icon/plane.png';
import { useState, useEffect } from "react";
import DietisianService from "../../../Services/Dietisian/dietisian";
import DoctorService from '../../../Services/konsultan/doctor';
import ChatService from '../../../Services/Chat/chat';
import { Link } from 'react-router-dom';


function Chat() {
    const token = localStorage.getItem("tokenDoctor");
    const [chatActive, setChatActive] = useState("group");
    const [user, setUser] = useState('');
    const [search, setSearch] = useState("");
    const [listRoom, setListRoom] = useState([]);

    const getUser = async() => {
        const res2 = await DoctorService.getUserLogin(token);
        console.log(token + " ini adalah token dokter");
        if (res2.status == 200){
            console.log(res2.data.data.username);
            setUser(res2.data.data.username);
            getRooms(res2.data.data.username, search);
        }
    }

    const getRooms = async(username) => {
        const result = await ChatService.getRooms(username, search);
        if (result.status == 200){
            setListRoom(result.data);
        }
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
                            Start New Conversation
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
                                        <p className="w-full text-start text-lg font-medium ms-5">{item.anotherUser}</p>
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