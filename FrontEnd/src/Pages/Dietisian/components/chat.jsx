import io from 'socket.io-client';
import axios from 'axios';
import acc from '/icon/user.png';
import senyum from '/icon/smile.png';
import pesawat from '/icon/plane.png';
import { useForm } from 'react-hook-form';
import { useState, useEffect, useRef } from "react";
import DietisianService from "../../../Services/Dietisian/dietisian";
import DoctorService from '../../../Services/konsultan/doctor';
import ChatService from '../../../Services/Chat/chat';
import { Link, useNavigate } from 'react-router-dom';

function Chat() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const token = localStorage.getItem("token");
    const [user, setUser] = useState('');
    const [messageList, setMessageList] = useState([]);
    const [roomId, setRoomId] = useState(window.location.pathname.split("/")[3]);
    const [room, setRoom] = useState({});
    const chatRef = useRef(null);
    const [loaded, setLoaded] = useState(false);
    
    const [listRoom, setListRoom] = useState([]);
    
    const { register, watch, reset } = useForm();
    
    function scrollToBottom() {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    };

    const sendMessage = async () => {
        if (watch("input_message") !== "") {
            await axios.post(`http://localhost:3000/api/chats/message`, {
                username: user,
                room_id: room.room_id,
                value: watch("input_message")
            });
            const msg = {
                id: messageList.length + 1,
                username: user,
                room_id: roomId,
                value: watch("input_message")
            }
            setMessageList([...messageList, msg]);
            
            reset({
                input_message: "",
            });
        }
    };

    const getUser = async() => {
        if(token){
            const res = await DietisianService.getUserLogin(token);
            if (res.status == 200){
                setLoaded(true);
                setUser(res.data.data.username);
                getAllRooms(res.data.data.username, search);
            } else {
                console.log(res.data.message);
            }
        } else {
            navigate("/login");
        }
    }

    useEffect(() => {
        getUser();
    }, [search]);

    const getChat = async() => {
        const result = await ChatService.getChat(roomId);
        setMessageList([...result.data]);
    }

    const getAllRooms = async(userss, search) => {
        const result = await ChatService.getRoomsUser(userss, search);
        if (result.status == 200){
            setListRoom(result.data);
        }
    }

    const getRoomById = async() => {
        const result = await ChatService.getRoomByRoomId(roomId);
        setRoom({...result.data});
    }

    useEffect(() => {
        scrollToBottom();
    }, [messageList])

    useEffect(() => {
        setListRoom([]);
        getRoomById()
        getUser();
        const chatInterval = setInterval(() => {
            getChat();
        }, 100);
        
        return () => clearInterval(chatInterval);
    }, [roomId])

    return (
        <>
            <div className="w-full h-full flex">
                <div className="w-8/12 h-full flex py-10 px-8">
                    <div className="w-full h-full flex flex-col bg-white rounded-3xl ">
                        <div className="w-full h-full flex flex-col justify-start px-14 py-12">
                            <div className='flex flex-row items-center'>
                                <img src={acc} className="w-12 h-full border-2 border-black rounded-full"/>
                                <p className='px-5 font-semibold text-xl'>{room.username_doctor}</p>
                                {console.log(user)}
                            </div>
                            <div className="w-full h-5/6 flex flex-col pt-8 gap-y-1.5 overflow-y-auto px-4" ref={ chatRef }>
                                {messageList.map((item, idx) => {
                                    if(item.username == user){
                                        return (
                                            <div key={idx} className="w-full flex justify-end">
                                                <p className="max-w-lg bg-hehe rounded-lg px-4 py-2 text-end">{item.value}</p>
                                            </div>
                                        )
                                    }else{
                                        return (
                                            <div key={idx} className="w-full flex justify-start">
                                                <p className="max-w-lg bg-gray-200 rounded-lg px-4 py-2">{item.value}</p>
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                            <div className="w-full h-12 flex justify-center items-center bg-gray-200 rounded-xl mt-4">
                                <button className="w-1/12 h-full flex items-center justify-center">
                                    <img src={senyum} className="h-1/2" />
                                </button>
                                <input type="text" className="w-10/12 h-full bg-transparent border-none outline-none text-lg" placeholder="Write here..." {...register("input_message")} onKeyUp={(e)=>{
                                    if(e.key === "Enter"){
                                        sendMessage();
                                    }
                                }}/>
                                <button onClick={sendMessage} className="w-1/12 h-full flex items-center justify-center">
                                    <img src={pesawat} className="h-1/2" />
                                </button>
                            </div>
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
                                <Link key={idx} className="w-full h-20 flex items-center" to={`/dietisian/chat/${item.room_id}`} onClick={()=>{
                                    setRoomId(item.room_id)
                                }}>
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