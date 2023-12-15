import io from 'socket.io-client';
import DietisianService from "../../../Services/Dietisian/dietisian";
import acc from '/icon/user.png';
import senyum from '/icon/smile.png';
import pesawat from '/icon/plane.png';
import ChatService from '../../../Services/Chat/chat';
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ChatHome(){
    const [userLogin, setUserLogin] = useState({});
    const [socket, setSocket] = useState(null);
    const [listRoom, setListRoom] = useState([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        const newSocket = io("http://localhost:6969");
        setSocket(newSocket);
        
        return () => {
            newSocket.disconnect();
        }
    }, []);

    const cariUser = async () =>{
        const token = localStorage.getItem("token");
        if(token){
            const res = await DietisianService.getUserLogin(token);
            if (res.status == 200){
                setUserLogin(res.data.data);
                getRoomsChat(res.data.data.username, search);
            }
        } else {
            navigate("/login");
        }
    }


    const getRoomsChat = async (username, search) =>{
        const result = await ChatService.getRooms(username, search);
        if (result.status == 200){
            setListRoom(result.data);
        }
    }

    useEffect(() => {
        cariUser();
    }, [search]);
    return (<>
        <div className='px-10 py-10 h-full flex flex-row'>
            <div className="w-3/4 h-full bg-purple-200 p-5 rounded-3xl me-5 drop-shadow-xl">
                chat
            </div>
            <div className="w-1/4 h-full bg-white p-5 rounded-3xl ms-5 drop-shadow-xl">
                <div className="w-full h-12 my-4 flex flex-col ">
                    <input type="search" className="w-full h-full bg-gray-200 rounded-2xl px-3" placeholder=" Search" onChange={(e)=>{
                        setSearch(e.target.value);
                    }}/>
                </div>
                <hr className="text-rose-800 border-2 border-rose-800 opacity-30 my-3"/>
                <div className="w-full h-5/6 flex flex-col overflow-y-auto gap-y-2">
                    {listRoom.map((room, index)=>{
                        return (
                            <Link key={index} className="w-full h-20 flex items-center" to={`/dietisian/chat/${room.room_id}`} onClick={()=>{
                                setRoom(item.room_id);
                            }}>
                                <div className="w-1/6 h-full flex items-center">
                                    <img src={acc} className="w-12 h-12 border border-black rounded-full"/>
                                </div>
                                <div className="w-5/6 h-full flex items-center justify-start pb-1">
                                    <p className="w-full text-start text-lg font-medium ms-5">{room.anotherUser}</p>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    </>)
}

export default ChatHome;