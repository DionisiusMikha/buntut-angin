import { io } from "socket.io-client";
import axios from 'axios';
import acc from '/icon/user.png';
import senyum from '/icon/smile.png';
import pesawat from '/icon/plane.png';
import { useForm } from 'react-hook-form';
import { useState, useEffect, useRef } from "react";
import DietisianService from "../../../Services/Dietisian/dietisian";
import DoctorService from '../../../Services/konsultan/doctor';
import ChatService from '../../../Services/Chat/chat';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"

// const socket = io.connect("http://localhost:6969");
function Chat() {
    const [socket, setSocket] = useState(null);
    const tokenDoctor = localStorage.getItem("tokenDoctor");
    const chatRef = useRef(null);
    // const tokenD = useSelector((state) => state.login.doctor)
    const room_id = window.location.pathname.split("/")[3];
    const [chatActive, setChatActive] = useState("group");
    const [user, setUser] = useState('');
    const [userDisplay, setUserDisplay] = useState('');
    const [messageList, setMessageList] = useState([]);
    const [room, setRoom] = useState(room_id);

    const [listRoom, setListRoom] = useState([]);

    const { register, watch, reset } = useForm();

    const joinRoom = () => {
        // if (room !== "") {
        //   socket.emit("joinRoom", room);
        // }
    };

    const sendMessage = async () => {
        if (watch("input_message") !== "") {
            const messageData = {
                room: room_id,
                message: watch("input_message")
            };
            // console.log(user);
            const showMsg = {
                username: user,
                room_id: room,
                value: watch("input_message")
            }
    
            await socket.emit("sendMessage", messageData);
            
            await axios.post(`http://localhost:3000/api/chats/message`, {
                username: user,
                room_id: room,
                value: watch("input_message")
            });
            setMessageList((list) => [...list, showMsg]);
            reset({
                input_message: "",
            });
        }
    };

    const getUser = async() => {
        const res2 = await DoctorService.getUserLogin(tokenDoctor);
        if (res2.status == 200){
            setUser(res2.data.data.username);
            getRooms(res2.data.data.username); 
        }
    }

    const getUserDisplay = async() => {
        const res = await ChatService.getUsername(room);
        if(res.data.name != ""){
            return setUserDisplay(res.data.name);    
        }

        const temp = res.data.username.split(",");
        
        if(temp[1] === user){
            return setUserDisplay(temp[0]);
        }else{
            return setUserDisplay(temp[1]);
        }
    }

    const getChat = async() => {
        console.log("masok");
        const result = await ChatService.getChat(room_id);
        setMessageList([...result.data]);
    }

    const getRooms = async(userss) => {
        const result = await ChatService.getRooms(userss);
        setListRoom([...result.data]);
    }

    const splitUser = (item) => {
        if(item.name != ""){
            return item.name;    
        }
        
        const temp = item.username.split(",");
        if(temp[0] == user){
            return temp[1];
        }

        return temp[0];
    }

    function scrollToBottom() {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messageList])

    useEffect(() => {
        if (socket == null) return;
        // console.log(socket)
        socket.emit("nyambung", () => {})
        socket.on("receiveMessage", (data) => {
            setMessageList((list) => [...list, data]);
        //     getChat();
        });

        return () => {
            socket.off('receiveMessage');
        //     socket.off('connect ');
            };
    }, [socket]);

    useEffect(() => {
        const newSocket = io("http://localhost:6969");
        setSocket(newSocket);
        
        return () => {
            newSocket.disconnect();
        }
    }, []);

    useEffect(() => {
        setUser('');
        setUserDisplay('');
        setListRoom([]);
        getUser();
        getChat();
        getUserDisplay();
        // joinRoom();
    }, [room])

    return (
        <>
            <div className="w-full h-full flex">
                <div className="w-8/12 h-full flex py-10 px-8">
                    <div className="w-full h-full flex flex-col bg-white rounded-3xl ">
                        <div className="w-full h-full flex flex-col justify-start px-14 py-12">
                            <div className="h-12 flex items-center gap-x-4">
                                <img src={acc} className="w-12 h-full border-2 border-black rounded-full"/>
                                {userDisplay ? (
                                    <p className="text-lg font-medium">{userDisplay}</p>
                                ) : (
                                    <p className="text-lg font-medium"></p>
                                )}
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
                            <input type="search" className="w-full h-full bg-gray-200 rounded-2xl px-3" placeholder=" Search" />
                        </div>
                        <div className="w-full h-12 flex justify-around items-center">
                            <button className={`text-xl text-rose-800 ${chatActive === "group" ? "underline" : "" }`} onClick={() => setChatActive("group")}>Group</button>
                            <button className={`text-xl text-rose-800 ${chatActive === "doctor" ? "underline" : "" }`} onClick={() => setChatActive("doctor")}>Doctor</button>
                        </div>
                        <hr className="text-rose-800 border-2 border-rose-800 opacity-30"/>
                        <div className="w-full h-5/6 flex flex-col overflow-y-auto gap-y-4 mt-8">
                            {listRoom.map((item, idx) => (
                                <Link key={idx} className="w-full h-20 flex items-center" to={`/konsultan/chat/${item.room_id}`}onClick={()=>{
                                    setRoom(item.room_id);
                                }}>
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