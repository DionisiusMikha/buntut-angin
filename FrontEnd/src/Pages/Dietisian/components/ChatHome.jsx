import io from 'socket.io-client';
import DietisianService from "../../../Services/Dietisian/dietisian";
import acc from '/icon/user.png';
import senyum from '/icon/smile.png';
import pesawat from '/icon/plane.png';
import ChatService from '../../../Services/Chat/chat';
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from 'react-hook-form';
import axios from 'axios';

function ChatHome(){
    const [userLogin, setUserLogin] = useState({});
    const [loaded, setLoaded] = useState(false);
    const [socket, setSocket] = useState(null);
    const [listRoom, setListRoom] = useState([]);
    const [room, setRoom] = useState("");
    const [search, setSearch] = useState("");
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [userDisplay, setUserDisplay] = useState('');
    const [messageList, setMessageList] = useState([]);
    const navigate = useNavigate();
    const chatRef = useRef(null);
    const { register, watch, reset } = useForm();

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
                setLoaded(true);
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

    function scrollToBottom() {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    };

    const sendMessage = async () => {
        if (watch("input_message") !== "") {
            const messageData = {
                room: room,
                message: watch("input_message")
            };
            console.log(userLogin.username);
            const showMsg = {
                username: userLogin.username,
                room_id: room,
                value: watch("input_message")
            }
    
            await socket.emit("sendMessage", messageData);
            await axios.post(`http://localhost:3000/api/chats/message`, {
                username: userLogin.username,
                room_id: room,
                value: watch("input_message")
            });
            setMessageList((list) => [...list, showMsg]);
            
            reset({
                input_message: "",
            });
        }
    };

    useEffect(() => {
        cariUser();
    }, [search]);

    useEffect(() => {
        if (socket == null || !loaded) return;
        socket.emit("addNewUser", userLogin.username);
        socket.on("getOnlineUsers", (res) => {
            setOnlineUsers(res);
        });

        return () => {
            socket.off("getOnlineUsers");
        }
    }, [socket, loaded]);

    useEffect(() => {
        scrollToBottom();
    }, [messageList])

    return (<>
        <div className='px-10 py-10 h-full flex flex-row'>
            <div className="w-3/4 h-full bg-white p-5 rounded-3xl me-5 drop-shadow-xl">
                {room == "" && <div className="w-full h-full flex flex-col items-center justify-center text-3xl font-semibold">
                    Start New Conversation
                </div>}
                {room != "" && <div className="w-full h-full flex flex-col text-2xl font-semibold p-5">
                    <div className='flex flex-row items-center'>
                        <img src={acc} className="w-12 h-full border-2 border-black rounded-full"/>
                        <p className='px-5'>{userDisplay}</p>
                    </div>
                    <hr className='border-2 my-3 border-rose-800 opacity-30'/>
                    <div className="w-full h-5/6 flex flex-col pt-8 gap-y-1.5 overflow-y-auto px-4" ref={ chatRef }>
                        {messageList.map((item, idx) => {
                            if(item.username == userLogin.username){
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
                </div>}
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
                            <button key={index} className="w-full h-20 flex items-center" onClick={()=>{
                                setRoom(room.room_id);
                                setUserDisplay(room.anotherUser);
                            }}>
                                <div className="w-1/6 h-full flex items-center">
                                    <img src={acc} className="w-12 h-12 border border-black rounded-full"/>
                                </div>
                                <div className="w-5/6 h-full flex items-center justify-start pb-1">
                                    <p className="w-full text-start text-lg font-medium ms-5">{room.anotherUser}</p>
                                </div>
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    </>)
}

export default ChatHome;